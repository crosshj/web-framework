import Box from '@mui/material/Box';
import { useContext } from 'react';
import StateContext from '../State';
import { useUser } from '@auth0/nextjs-auth0';
import { Loading } from '../components/Loading';
import Beekeeper from '../components/Beekeeper';

const Wrapper = ({ children }) => (
	<div className="body">
		<div className="flex-row">
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				{children}
			</Box>
		</div>
	</div>
);

const WrappedLoading = () => (
	<Wrapper>
		<Loading />
	</Wrapper>
);

const Welcome = ({ group, language: l }) => (
	<Wrapper>
		<h3>{l?.welcomeGroup || 'Welcome To The Group!'}</h3>
		<p>
			{l?.welcomeGroupDetail.replace('{{groupName}}', group.name) ||
				'You are now part of the group, {{groupName}}!'.replace(
					'{{groupName}}',
					group.name
				)}
		</p>
	</Wrapper>
);

const Login = ({ invite, language: l }) => (
	<Wrapper>
		<h3>{l?.invitedButFirst || 'You are invited! But first...'}</h3>
		<p>
			{l?.invitePleaseLogin ||
				'Please login to join the beekeeper group!'}
		</p>
		<button
			onClick={(e) => {
				e.preventDefault();
				window.location.href = `/api/auth/login?returnTo=/invite/${invite}`;
			}}
		>
			{l?.login || 'Login'}
		</button>
	</Wrapper>
);

const Accept = ({ onClick, language: l }) => (
	<Wrapper>
		<h3>{l?.invitedYou || 'You are invited!'}</h3>
		<p>
			{l?.invitedYouDetail ||
				'You have been invited to join a beekeeper group!'}
		</p>
		<button onClick={onClick}>{l?.accept || 'Accept'}</button>
	</Wrapper>
);

const Invite = () => {
	const stateContext = useContext(StateContext);
	const {
		state: {
			invite,
			GroupMember: [group],
			MobileMe,
			MobileCreateBeekeeper,
			loading: stateLoading,
			language,
		},
		api: { AcceptInvite },
	} = stateContext;
	const { user, error: userError, isLoading: userLoading } = useUser();

	if (stateLoading || userLoading) return <WrappedLoading />;
	if (group) return <Welcome group={group} />;
	if (!user || userError)
		return <Login invite={invite} language={language} />;

	//console.log({ MobileMe, MobileCreateBeekeeper, state: stateContext.state });
	if (!(MobileMe || MobileCreateBeekeeper))
		return <Beekeeper language={language} />;

	return <Accept onClick={() => AcceptInvite({ input: { invite } })} />;
};

export default Invite;

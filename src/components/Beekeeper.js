import {
	FormControl,
	FormGroup,
	Box,
	InputLabel,
	Input,
	Button,
	Select,
	MenuItem,
} from '@mui/material';
import { useContext, useState } from 'react';
import StateContext from '../State';
import { Loading } from '../components/Loading';

const UnitPreference = ['METRIC', 'IMPERIAL'];
const TempPreference = ['CELCIUS', 'FAHRENHEIT'];
const Experience = ['NOVICE', 'BEGINNER', 'INTERMEDIATE', 'EXPERT'];
const Environment = ['RURAL', 'SUBURBAN', 'URBAN'];
const Language = ['EN', 'AM', 'AR', 'DE', 'ES', 'RU', 'UZ'];

const Wrapper = ({ children }) => (
	<div className="body">
		<div className="flex-row">
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				{children}
			</Box>
		</div>
	</div>
);

const defaultKeeper = {
	unitPreference: 'METRIC',
	tempPreference: 'CELCIUS',
	beekeepingExperience: 'NOVICE',
	environment: 'RURAL',
	language: undefined,
};

export default function Beekeeper() {
	const [keeper, setKeeper] = useState(defaultKeeper);
	const {
		state: { loading: stateLoading, language: l },
		api,
		setLanguage,
	} = useContext(StateContext);

	if (stateLoading) return <Loading />;

	const createBeekeeper = () => {
		//keeper.birthYear = Number(keeper.birthYear);
		//console.log(JSON.stringify({ keeper }, null, 2));
		api.CreateBeekeeper({ input: keeper });
	};

	return (
		<Wrapper>
			<h3>
				{l?.createBeekeeperAccount || 'Create Your Beekeeper Account'}
			</h3>
			<FormGroup>
				<FormControl>
					<InputLabel htmlFor="beekeeper-first-name">
						{l?.firstName || 'First Name'}
					</InputLabel>
					<Input
						id="beekeeper-first-name"
						onChange={(e) =>
							setKeeper({ ...keeper, firstName: e.target.value })
						}
					/>
				</FormControl>

				<FormControl>
					<InputLabel htmlFor="beekeeper-last-name">
						{l?.lastName || 'Last Name'}
					</InputLabel>
					<Input
						id="beekeeper-last-name"
						onChange={(e) =>
							setKeeper({ ...keeper, lastName: e.target.value })
						}
					/>
				</FormControl>

				{/* <FormControl>
					<InputLabel htmlFor="beekeeper-birth-year">
						Birth Year
					</InputLabel>
					<Input
						id="beekeeper-birth-year"
						type="number"
						onChange={(e) =>
							setKeeper({ ...keeper, birthYear: e.target.value })
						}
					/>
				</FormControl> */}

				<FormControl>
					<InputLabel id="beekeeper-lang-label">
						{l?.language || 'Language'}
					</InputLabel>
					<Select
						id="beekeeper-lang"
						labelId="beekeeper-lang-label"
						onChange={(e) => {
							setKeeper({
								...keeper,
								language: e?.target?.value,
							});
							setLanguage(e?.target?.value || 'EN');
						}}
						value={keeper.language || l?._language}
						label={l?.language || 'Language'}
					>
						{Language.map((x, i) => (
							<MenuItem value={x} key={'langua-' + i}>
								{l?.[x] || x}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl>
					<InputLabel id="beekeeper-temp-pref-label">
						{l?.tempPreference || 'Temperature Preference'}
					</InputLabel>
					<Select
						id="beekeeper-temp-pref"
						labelId="beekeeper-temp-pref-label"
						onChange={(e) =>
							setKeeper({
								...keeper,
								tempPreference: e.target.value,
							})
						}
						value={keeper.tempPreference}
						label={l?.tempPreference || 'Temperature Preference'}
					>
						{TempPreference.map((x, i) => (
							<MenuItem value={x} key={'temp-pref-' + i}>
								{l?.[x] || x}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl>
					<InputLabel id="beekeeper-unit-pref-label">
						{l?.unitPreference || 'Unit Preference'}
					</InputLabel>
					<Select
						id="beekeeper-unit-pref"
						labelId="beekeeper-unit-pref-label"
						onChange={(e) =>
							setKeeper({
								...keeper,
								unitPreference: e.target.value,
							})
						}
						value={keeper.unitPreference}
						label={l?.unitPreference || 'Unit Preference'}
					>
						{UnitPreference.map((x, i) => (
							<MenuItem value={x} key={'unit-pref-' + i}>
								{l?.[x] || x}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl>
					<InputLabel id="beekeeper-environ-label">
						{l?.environment || 'Environment'}
					</InputLabel>
					<Select
						id="beekeeper-environ"
						labelId="beekeeper-environ-label"
						onChange={(e) =>
							setKeeper({
								...keeper,
								environment: e.target.value,
							})
						}
						value={keeper.environment}
						label={l?.environment || 'Environment'}
					>
						{Environment.map((x, i) => (
							<MenuItem value={x} key={'enviro-' + i}>
								{l?.[x] || x}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl>
					<InputLabel id="beekeeper-experience-label">
						{l?.beekeepingExperience || 'Beekeeping Experience'}
					</InputLabel>
					<Select
						id="beekeeper-experience"
						labelId="beekeeper-experience-label"
						onChange={(e) =>
							setKeeper({
								...keeper,
								beekeepingExperience: e.target.value,
							})
						}
						value={keeper.beekeepingExperience}
						label={
							l?.beekeepingExperience || 'Beekeeping Experience'
						}
					>
						{Experience.map((x, i) => (
							<MenuItem value={x} key={'experi-' + i}>
								{l?.[x] || x}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<Button onClick={createBeekeeper}>
					{l?.create || 'Create'}
				</Button>
			</FormGroup>
		</Wrapper>
	);
}

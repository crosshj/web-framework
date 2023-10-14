import { Flow } from '../components/Flow';
import { Alert } from '../components/Alert';
import { CodeBlock } from '../components/CodeBlock/CodeBlock';
import { DatePicker } from '../components/DatePicker';
import { DateTimePicker } from '../components/DateTimePicker';
import { Dialog } from '../components/Dialog';
import { ErrorThrower } from '../components/ErrorThrower';
import { GridContainer } from '../components/GridContainer';
import { Icon } from '../components/Icon';
import { Markdown } from '../components/Markdown/Markdown';
import { Pill } from '../components/Pill';
import { Step } from '../components/Step';
import { Stepper } from '../components/Stepper';
import { TableInput } from '../components/TableInput';
import * as Tabs from '../components/Tabs';
import { Validator } from '../components/Validator';
import { DataViz } from '../components/DataViz/DataViz';

import MUIGeneric from '../components/_MUI';

import { Navigate } from '../components/Flow/Navigate/index.jsx';
import TalentMobilePage from '../components/TalentMobilePage';
import TimeClockPage from '../components/TimeClockPage';
import {
	actionAdapter,
	actionsControlAdapter,
	barGraphAdapter,
	cardAdapter,
	dashboardAdapter,
	dataAdapter,
	dataEditViewAdapter,
	fileUploaderAdapter,
	formDateAdapter,
	formInputAdapter,
	gridAdapter,
	linkAdapter,
	linkMenuAdapter,
	pageAdapter,
	pageContentAdapter,
	pageHeaderAdapter,
	rlvAdapter,
	searchAdapter,
	selectorAdapter,
	spacingAdapter,
	stepButtonsAdapter,
	stepFooterAdapter,
	successAdapter,
	tableAdapter,
	tagManagerAdapter,
	tooltipAdapter,
} from '.';
import { dataListViewAdapter } from './dataListView';
import { genericAdapter } from './generic';

export const adapterMap = {
	...MUIGeneric,
	Alert: genericAdapter(Alert),
	Page: pageAdapter,
	PageNavBar: pageHeaderAdapter,
	Table: tableAdapter,
	Icon: genericAdapter(Icon),
	ResourceListView: rlvAdapter,
	PercentageBar: barGraphAdapter,
	Card: cardAdapter,
	Dashboard: dashboardAdapter,
	DataViz: genericAdapter(DataViz),
	Tooltip: tooltipAdapter,
	Selector: selectorAdapter,
	PageContent: pageContentAdapter,
	MenuItem: linkAdapter,
	LinkMenu: linkMenuAdapter,
	Step: genericAdapter(Step),
	FileUploader: fileUploaderAdapter,
	StepFooter: stepFooterAdapter,
	Success: successAdapter,
	Input: formInputAdapter,
	NewFormInput: formInputAdapter,
	OptionList: formInputAdapter,
	FormDate: formDateAdapter,
	Search: searchAdapter,
	TagManager: tagManagerAdapter,
	Grid: gridAdapter,
	ButtonSubmit: linkAdapter,
	Spacing: spacingAdapter,
	DatePicker: genericAdapter(DatePicker),
	Stepper: genericAdapter(Stepper),
	DataListView: dataListViewAdapter,
	StepButtons: stepButtonsAdapter,
	TableInput: genericAdapter(TableInput),
	DataEditView: dataEditViewAdapter,
	BranchTable: dataEditViewAdapter,
	NestedTable: dataEditViewAdapter,
	ErrorThrower: genericAdapter(ErrorThrower),
	Tabs: genericAdapter(Tabs?.Tabs),
	TabContainer: genericAdapter(Tabs?.TabContainer),
	Dialog: genericAdapter(Dialog),
	ActionsControl: actionsControlAdapter,
	Action: actionAdapter,
	DateTimePicker: genericAdapter(DateTimePicker),
	Pill: genericAdapter(Pill),
	GridContainer: genericAdapter(GridContainer),
	Navigate: genericAdapter(Navigate),
	TimeClockPage: genericAdapter(TimeClockPage),
	Validator: genericAdapter(Validator),
	CodeBlock: genericAdapter(CodeBlock),
	TalentMobilePage: genericAdapter(TalentMobilePage),
	Markdown: genericAdapter(Markdown),

	//TODO: use these in framework:Selector without component/adapter
	Data: dataAdapter,
	Flow: genericAdapter(Flow),
};

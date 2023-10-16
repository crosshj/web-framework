export const ctxFeatures = JSON.stringify({
	data: {
		ContextProc: [
			{
				cacheExpires: null,
				name: 'ui.sp_UIContextGetComponentsByUserID',
				uuid: '4b56fd25-bfcc-4907-8de3-464372be0223',
				results: [
					{
						default: '',
						key: 'Page',
						label: '',
						order: '1',
						parent: '',
						properties: '',
						target: '',
						type: 'Page',
						value: '',
					},
					{
						default: '',
						key: 'Page.PageNavBar',
						label: 'Features',
						order: '101',
						parent: 'Page',
						properties: '',
						target: '',
						type: 'PageNavBar',
						value: '',
					},
					{
						default: '',
						key: 'Page.PageContent',
						label: '',
						order: '102',
						parent: 'Page',
						properties: '',
						target: '',
						type: 'PageContent',
						value: '',
					},
					{
						default: '',
						key: 'Page.PageContent.Markdown',
						label: '',
						order: '10201',
						parent: 'Page.PageContent',
						properties:
							'textContent: ## Status Legend\\n\\n| Icon                          | Status                                                                   |\\n| ----------------------------- | ------------------------------------------------------------------------ |\\n| `icon\\:CheckCircle;green`      | Complete                                                                 |\\n| `icon\\:Construction;indigo900` | Work In Progress                                                         |\\n| `icon\\:Warning;amber800`       | To Do                                                                    |\\n\\n* * *\\n\\n[Deprecated Features](/features/deprecated)\\n\\n## Data\\n\\n| Status                        | Name / Link                                                             | Description                                   |\\n| ----------------------------- | ----------------------------------------------------------------------- | --------------------------------------------- |\\n| `icon\\:Construction;indigo900` | [Complex 1](/features/data/complex1)                                    | A complex data example.                       |\\n| `icon\\:Construction;indigo900` | [Complex 2](/features/data/complex2)                                    | An extension of data/complex1 which covers complex options lists scenarios |\\n| `icon\\:CheckCircle;green`      | [Get Opts](/features/data/getOpts)                                      | Read options data from DB.                    |\\n| `icon\\:CheckCircle;green`      | [JSON-ify](/features/data/JSONify)                                      | Submitting JSON string paramater to database. |\\n| `icon\\:CheckCircle;green`      | [Path-based](/features/data/pathBased)                                  | Read data from the URL path.                  |\\n| `icon\\:Warning;amber800`       | [Validation](/features/data/validation)                                 | Validate data from DB and in UI.              |\\n\\n## Flows\\n\\n| Status                        | Name / Link                                                             | Description                                                     |\\n| ----------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------- |\\n| `icon\\:Construction;indigo900` | [Confirm](/features/flows/confirm)                                      | Add a popup step in a flow.                                     |\\n| `icon\\:Construction;indigo900` | [Query Call](/features/flows/query/call)                                | Call an API with Query\\, eg. Vertex API                          |\\n| `icon\\:Construction;indigo900` | [Query Multiple](/features/flows/query/multi)                           | Mulitiple Query components in one Flow.                         |\\n| `icon\\:Construction;indigo900` | [Navigate](/features/flows/navigate)                                    | Shows how to use the Navigate step in a flow.                   |\\n| `icon\\:Construction;indigo900` | [Query Static Params](/features/flows/query/staticParams)               | Submit a Query with static parameter.                           |\\n| `icon\\:Construction;indigo900` | [Query /w Params](/features/flows/query/params)                         | Submit a Query with parameters.                                 |\\n| `icon\\:Construction;indigo900` | [Query /w Static Params](/features/flows/args)                          | When an action triggers a flow\\, "pass data" to flow             |\\n| `icon\\:Construction;indigo900` | [Async Process](/features/flows/asyncProcess)                           | Use DB Workflows to execute long-running process.               |\\n| `icon\\:Construction;indigo900` | [Async Multi-Step](/features/flows/asyncMultiStep)                      | Use DB Workflows to execute a multi-step process.               |\\n| `icon\\:Construction;indigo900` | [Generalized Workflows](/features/flows/generalizedWorkflows)           | Workflows that aren\'t long-running but still need to save state |\\n| `icon\\:Construction;indigo900` | [Table Submit](/features/flows/tableSubmit)                             | Submit an entire table of data to a DB proc.                    |\\n| `icon\\:Construction;indigo900` | [Triggers](/features/flows/triggers)                                    | Trigger a flow when page loads or closes                         |\\n| `icon\\:Construction;indigo900` | [Set Data](/features/flows/setData)                                     | Manipulate global data.                                         |\\n| `icon\\:Construction;indigo900` | [Local Data](/features/flows/localData)                                 | Manipulate Flow data (flowArgs)                                  |\\n\\nsee also\\:\\n\\n-   [Props / Dynamic Bind](/features/props/dynamicBind) - Subscribe component calls flow!\\n\\n## Tables\\n\\n| Status                        | Name / Link                                                            | Description                                                                                                           |\\n| ----------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |\\n| `icon\\:Construction;indigo900` | [Conditional Row Actions](/features/tables/ConditionalRowActions)      | Show actions on some rows but nt others                                                                               |\\n| `icon\\:Construction;indigo900` | [Encryption](/features/tables/Encryption)                              | Show an encryted table in a de-crypted state                                                                          |\\n| `icon\\:Construction;indigo900` | [Extensible Columns](/features/tables/ExtensibleCols)                  | Support regular components inside table cells\\, versus previous approach with column "variant"                         |\\n| `icon\\:Construction;indigo900` | [Nested w/ Configurable Columns](/features/tables/nestedColumnConfigs) | Custom columns based on Nest Level                                                                                    |\\n| `icon\\:Construction;indigo900` | [Sticky Columns](/features/tables/stickyColumns)                       | Pin columns to left or right\\, useful in horizontally scrolled tables                                                  |\\n| `icon\\:Construction;indigo900` | [Addon Elements](/features/tables/addonElements)                       | Add some rows at the bottom of table                                                                                  |\\n| `icon\\:Construction;indigo900` | [Nest Headers](/features/tables/nestHeaders)                           | Customize headers for nest levels.  Includes totals example.                                                          |\\n| `icon\\:Construction;indigo900` | [Table Forms](/features/tables/forms)                                  | provides way to fill values\\, including dynamic ones\\, in order to create or update entities through or within a table.  See also [props/dynamicBind](/features/props/dynamicBind) |\\n| `icon\\:Construction;indigo900` | [Nest Levels 0](/features/tables/nestLevels0)                          | Tables with no nest levels.                                                                                           |\\n| `icon\\:Construction;indigo900` | [Nest Levels 1](/features/tables/nestLevels1)                          | Tables with one nest level.                                                                                           |\\n| `icon\\:Construction;indigo900` | [Nest Levels 2](/features/tables/nestLevels2)                          | Tables with two nest levels.                                                                                          |\\n| `icon\\:Construction;indigo900` | [Nest Levels 3](/features/tables/nestLevels3)                          | Tables with three nest levels.                                                                                        |\\n| `icon\\:Construction;indigo900` | [Empty](/features/tables/empty)                                        | A table with no results in it.                                                                                        |\\n| `icon\\:Construction;indigo900` | [Complex 1](/features/tables/complex1)                                 | Complex Table Scenarios #1\\: lots of nesting and addons examples                                                       |\\n\\nIn most cases\\, components should be treated the same whether they render inside or outside a table.\\nHowever\\, there are cases\\, like with selecting rows\\, where the table and inner components should act in tandem and this calls for more complex data-binding.\\n\\nSee the table sections at the following links for further explorations of these concepts.\\n\\n-   [Components / MUI Switch](/features/components/switch)\\n-   [Components / MUI Radio Button](/features/components/radioButton)\\n-   [Components / MUI Checkbox](/features/components/checkbox)\\n\\n## Components\\n\\n| Status                        | Name / Link                                                              | Description                                                                              |\\n| ----------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |\\n| `icon\\:Construction;indigo900` | [Pills](/features/components/StandalonePills)                            | Pill indicator as a standalone component.                                                |\\n| `icon\\:CheckCircle;green`      | [Actions](/features/components/Actions)                                  | Anything that can trigger a flow when clicked\\, i.e Buttons\\, Links\\, Chips and IconButtons |\\n| `icon\\:CheckCircle;green`      | [Obscured](/features/components/obscured)                                | What obscured data looks like and how to configure it i.e. \\*\\*\\* or ##.                 |\\n| `icon\\:CheckCircle;green`      | [MUI Icons](/features/components/MUIIcons)                               | MUI Icons                                                                                |\\n| `icon\\:CheckCircle;green`      | [Custom Icons](/features/components/NonMUIIcons)                         | Custom SVG icons which augment MUI icons.                                                |\\n| `icon\\:CheckCircle;green`      | [Hide Components](/features/components/HideComponent)                    | Hide a component based on some Data value                                                |\\n| `icon\\:CheckCircle;green`      | [MUI Textfield](/features/components/textField)                          | MUI Textfield Component\\, which also covers Input Variations including Select and Options |\\n| `icon\\:CheckCircle;green`      | [MUI Checkbox](/features/components/checkbox)                            | MUI Checkbox                                                                             |\\n| `icon\\:CheckCircle;green`      | [MUI Radio Button](/features/components/radioButton)                     | MUI Radio Button                                                                         |\\n| `icon\\:CheckCircle;green`      | [MUI Switch](/features/components/switch)                                | MUI Switch                                                                               |\\n| `icon\\:CheckCircle;green`      | [Data Visualization](/features/components/dataViz)                       | Data Visualization using [Recharts](https\\://recharts.org/)                               |\\n| `icon\\:CheckCircle;green`      | [MUI Step indicator](/features/components/stepIndicator)                 | MUI Step Indicator                                                                       |\\n\\nsee also\\:\\n\\n-   [Data / Get Opts](/features/data/getOpts) - shows examples of Options Lists in use\\n\\n## Props\\n\\n| Status                        | Name / Link                                                              | Description                                                                                                                                          |\\n| ----------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |\\n| `icon\\:Construction;indigo900` | [Dynamic Bind](/features/props/dynamicBind)                              | When a component depends on data from another component. For instance a multi-step form where each step depends on chosen option from previous step. See also [tables/forms](/features/tables/forms) |\\n\\n## Forms\\n\\n| Status                        | Name / Link                                                              | Description                               |\\n| ----------------------------- | ------------------------------------------------------------------------ | ----------------------------------------- |\\n| `icon\\:Construction;indigo900` | [Inputs](/features/forms/inputs)                                         | Form inputs; use a TextField instead      |\\n| `icon\\:Construction;indigo900` | [Input Labels](/features/forms/labels)                                   | Form Input labels; use a TextFiel instead |\\n| `icon\\:Construction;indigo900` | [Submit Mutliple Forms](/features/forms/procComposition/999)             | Submit multiple Forms at once             |\\n| `icon\\:Construction;indigo900` | [Grid Layout](/features/forms/grid)                                      | Layout Components in a Grid               |\\n\\n## Sandbox / WIP\\n\\n*The following is holding space for short-term work.*\\n\\n| Status                        | Name / Link                                                              | Description                              |\\n| ----------------------------- | ------------------------------------------------------------------------ | ---------------------------------------- |\\n| `icon\\:Construction;indigo900` | [Talent Mobile](/features/data/complex1)                                 | Mobile Talent screen(s)                  |\\n| `icon\\:CheckCircle;green`      | [PDF export](/pdf/)                                                      | Export PDF\\, eg. Invoices\\, Paychecks\\, etc |\\n| `icon\\:Construction;indigo900` | [Roles and Access Rights](/features/rolesAndAccessRights)                | Roles and Access Rights views            |\\n| `icon\\:Construction;indigo900` | [Time Entry WIP](/features/timecardEntryWIP)                             | Timecard Entry playground                |',
						target: '',
						type: 'Markdown',
						value: '',
					},
					{
						default: '',
						key: 'Page.PageContent.Box',
						label: '',
						order: '10202',
						parent: 'Page.PageContent',
						properties: '_for:pageOverScroll, height:200px',
						target: '',
						type: 'Box',
						value: '',
					},
				],
			},
		],
	},
});

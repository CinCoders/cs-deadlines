# USAGE

**The files in this folder are just examples and are not used by the system.**
The system downloads a csv file expecting the structure of [deadlines.csv](./deadlines.csv).

This file is generated automatically based on a google drive spreadsheet using google drive api. The google drive spreadsheet currently used is represented here as the Top CS Deadlines.xlsx.

To use the same spreadsheet in google drive you need to upload the Top CS Deadlines.xlsx to google drive as a google docs spreadsheet and edit with your data.

## Configuration

The google spreadsheet needs to be shared with "Anyone with the link" as viewer to be able to download.

Also you need to configure environment variables (either in the .env file or, if using github pages, in the github variables at the repository settings > Secrets and variables > Actions > variables).

REACT_APP_SHEET_ID=<your_googledrive_spreadsheet_id>
REACT_APP_SHEET_NAME=<the_deadline_sheet_name_in_the_spreadsheet>

The "REACT_APP_SHEET_ID" is obtained in the spreadsheet link. E.g.: in "https://docs.google.com/spreadsheets/d/12345678901234567890123456789012345678901234/edit" the spreadsheet id is 12345678901234567890123456789012345678901234

## Editing you data

You add or change areas in "Areas" sheet. There is no need to manually input AreaID, it is automatically generated.

In the "Conferences" sheet you change the conferences to be displayed. In this sheet the AreaId and GreatArea are generated automatically based on the choosen area. There is no need to manually input ConferenctID, it is automatically generated.

The "Deadlines" sheet is the one used by the system to display the deadlines. You only need to set the Conference column, then the conference data and area are loaded based on the other sheets. There is no need to manually input DeadlineID, it is automatically generated.

### Deadline sheet columns:

| Column           | Meaning                                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| Conference       | The conference name from the "Conferences" sheet                                                                 |
| DeadlineID       | Automatically generated                                                                                          |
| Order            | The number of the displayed deadlines when a conference has more than one deadline, starting as 1                |
| Deadline         | The human readable deadline data                                                                                 |
| DeadlineTimeZone | The Time Zone of the deadline                                                                                    |
| DeadlineISO      | The actual deadline data used by cs-deadlines, automatically formated and generated based on the Deadline column |
| Detail           | Any detail you may display for the specific deadline                                                             |

\*The other columns, for area and conference informations are automatically obtained based on their own sheets and don't need to be manually set.

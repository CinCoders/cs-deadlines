import { CircularProgress, Link, Typography } from '@mui/material';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import FilterPage from '../../components/Filter';
import FilterByArea from '../../components/FilterByArea';
import { FilterContainer, FilterByAreaContainer } from './styles';

interface DeadlineProps {
  deadlineId: string;
  conference: string;
  website: string;
  conferenceDetail: string;
  area: string;
  conferenceDates: string;
  location: string;
  submissionDeadline: Date;
  deadlineDetails: string;
  subArea: string;
  greatArea: string;
}

function compare(a: DeadlineProps, b: DeadlineProps) {
  if (a.submissionDeadline < b.submissionDeadline) {
    if (a.submissionDeadline < new Date()) {
      return 1;
    }
    return -1;
  }
  if (a.submissionDeadline > b.submissionDeadline) {
    if (b.submissionDeadline < new Date()) {
      return -1;
    }
    return 1;
  }
  return 0;
}

function Home() {
  const [deadlines, setDeadlines] = useState<DeadlineProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  useEffect(() => {
    const sheetUrl =
      'https://docs.google.com/spreadsheets/d/' +
      `${process.env.REACT_APP_SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${process.env.REACT_APP_SHEET_NAME}`;
    Papa.parse(sheetUrl, {
      download: true,
      complete(results) {
        const rawDeadlines: string[][] = results.data as string[][];
        const parsedDeadlines = rawDeadlines.map((deadline: string[]) => ({
          greatArea: deadline[rawDeadlines[0].indexOf('GreatArea')],
          deadlineId: deadline[rawDeadlines[0].indexOf('DeadlineId')],
          conference: deadline[rawDeadlines[0].indexOf('Conference')],
          website: deadline[rawDeadlines[0].indexOf('WebSite')],
          conferenceDetail: deadline[rawDeadlines[0].indexOf('ConferenceDetail')],
          subArea: deadline[rawDeadlines[0].indexOf('Area')],
          area: `${deadline[rawDeadlines[0].indexOf('GreatArea')]} - ${deadline[rawDeadlines[0].indexOf('Area')]}`,
          conferenceDates: deadline[rawDeadlines[0].indexOf('ConferenceDates')],
          location: deadline[rawDeadlines[0].indexOf('Location')],
          submissionDeadline: new Date(deadline[rawDeadlines[0].indexOf('DeadlineISO')]),
          deadlineDetails: deadline[15],
        }));

        parsedDeadlines.splice(0, 1);
        parsedDeadlines.sort(compare);
        setDeadlines(parsedDeadlines);
        setLoading(false);
      },
    });
  }, []);

  const handleCheckedChange = (checkedChangedValues: string[]) => {
    setCheckedValues(checkedChangedValues);
  };

  return (
    <main>
      <Typography variant='h6'>
        {'The top CS conferences are listed in '}
        <Link target='_blank' href='https://CSRankings.org'>
          CSRankings.org
        </Link>
      </Typography>
      {loading && <CircularProgress />}
      {!loading && (
        <FilterContainer>
          <FilterByAreaContainer>
            <FilterByArea deadlines={deadlines} checkedValues={checkedValues} onCheckedChange={handleCheckedChange} />
          </FilterByAreaContainer>

          <FilterPage deadlines={deadlines} checkedValues={checkedValues} />
        </FilterContainer>
      )}
    </main>
  );
}

export default Home;

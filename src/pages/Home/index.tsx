import { ConferenceProps } from '../../components/Conference';
import Papa from 'papaparse';
// @ts-ignore
import TopDeadlines from '../../database/TopDeadlines.csv';
import { useEffect, useState } from 'react';
import FilterPage from '../../components/Filter';

function compare(a: ConferenceProps, b: ConferenceProps) {
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
  const [conferences, setConferences] = useState<ConferenceProps[]>([]);

  useEffect(() => {
    Papa.parse(TopDeadlines, {
      download: true,
      complete: function (results) {
        const parsedConferences = (results.data as string[][]).map((deadline: string[]) => {
          return {
            conference: deadline[4],
            website: deadline[6],
            conferenceDetail: deadline[5],
            area: deadline[2],
            conferenceDates: deadline[7],
            location: deadline[8],
            submissionDeadline: new Date(deadline[12]),
            deadlineDetails: deadline[16],
          };
        });
        parsedConferences.splice(0, 1);
        parsedConferences.sort(compare);
        setConferences(parsedConferences);
      },
    });
  }, []);

  return <FilterPage conferences={conferences} />;
}

export default Home;

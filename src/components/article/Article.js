import React, {useState, useEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Subsection from '../Subsection';

import Button from '@mui/material/Button';


const notesExample = {
    sections : [
        {
            title: 'Introduction',
            subsections : [
                {title: 'Sub Intro 1'},
                {title: 'Sub Intro 2'},
            ]
        },
        // {
        //     title: 'Methods',
        //     subsections : [
        //         {title: 'Sub Methods 1'},
        //         {title: 'Sub Methods 2'},
        //     ]
        // },
        // {
        //     title: 'Results',
        //     subsections : [
        //         {title: 'Sub Results 1'},
        //         {title: 'Sub Results 2'},
        //     ]
        // },
        {
            title: 'Discussion',
            subsections : [
                {title: 'Sub Discussion 1'},
                {title: 'Sub Discussion 2'},
            ]
        }
    ]
}

export default function Article({metadata}) {
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState();
  const [parsedNotes, setParsedNotes] = useState();
  const [articleData, setArticleData] = useState(metadata);

  useEffect(() => {
    if(parsedNotes) {
        setArticleData({...articleData, ...parsedNotes})
    }
  }, [parsedNotes, articleData]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onNotesInput = (e) => {
    const notesArea = e.target;
    const notesInput = notesArea.value
    setNotes(notesInput);
    const parseError = notesArea.classList.contains('parse-error');
    try {
        const parsedNotes = JSON.parse(notesInput);
        setParsedNotes(parsedNotes);
        if (parseError) {
            notesArea.classList.remove('parse-error')
        }
    } catch (error) {
        setParsedNotes();
        if (!parseError) {
            notesArea.classList.add('parse-error')
        }
    }
  }

  const onNotesReset = (event) => {
      event.preventDefault();
      console.log('Reset')
      setNotes('');  
  }

  const startWithDefaultNotes = (event) => {
    event.preventDefault();
    setNotes(JSON.stringify(notesExample, null, 2));
    setParsedNotes(notesExample);
  }

  return (
    <div>
      <h1> {articleData.title} </h1>
      <Accordion sx={{margin: "10px 0;", backgroundColor:"lightblue"}} expanded={expanded === 'panel0'} onChange={handleChange('panel0')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Notes / Thoughts / Plan
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Reset to see the example JSON format</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button sx={{margin: "20px 10px;"}} onClick={onNotesReset} variant="contained" color="secondary"> Reset </Button>
          <Button variant="contained" onClick={startWithDefaultNotes}> Start with default </Button>
            <section className="grid">
                <article>
                    <textarea 
                    className="parse-area"
                    value={notes}
                    onChange={onNotesInput}
                    placeholder={JSON.stringify(notesExample, null, 2)}
                    />
                </article>    
            </section>
        </AccordionDetails>
      </Accordion>

    {
        articleData.sections?.map((section, secIdx) => (
        <Accordion key={secIdx} sx={{margin: "10px 0;"}} expanded={expanded === `panel${secIdx+1}`} onChange={handleChange(`panel${secIdx+1}`)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                {`${secIdx+1}. ${section.title}`}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <section className="grid">
                {
                    section.subsections?.map((subsection, subsecIdx) => (
                        <Subsection 
                        title={`${secIdx+1}.${subsecIdx+1} ${subsection.title}`}
                        />
                    ))
                }
            </section>
            </AccordionDetails>
        </Accordion>
        ))
    }
    </div>
  );
}

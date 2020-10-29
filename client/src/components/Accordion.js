import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import GroovyButton from './GroovyButton';
import { useHistory } from 'react-router-dom';
import './Accordion.css'


const Accordion = withStyles({
  root: {
    width: "100%",
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {
  },
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    marginBottom: -1,
    borderRadius: "10px",
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
}))(MuiAccordionDetails);

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('');

  const history = useHistory();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const browseall = () => {
    history.push("/browse/gear/all")
  }

  const browseby = () => {
    history.push("/browse/gear/by")
  }

  return (
    <div>
        <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography className="cust">Feed</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <GroovyButton>See activity </GroovyButton>
            {/* <GroovyButton> Browse by</GroovyButton> */}
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography className="cust">Gear</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GroovyButton onClick={browseall}> Browse all</GroovyButton>
          {/* <GroovyButton onClick={browseby}>  Browse by</GroovyButton> */}
        </AccordionDetails>
      </Accordion>

      {/* <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography className="cust">Browse Projects</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <GroovyButton> Browse all </GroovyButton>
            <GroovyButton> Browse by</GroovyButton>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}

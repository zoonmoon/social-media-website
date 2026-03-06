import { Typography, Box, Button, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

export default function CreativesIntro() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box>

      
      <Typography sx={{ mt: 1 }}>
        <strong>

          The Founding Artist $100 Challenge is Live!


        </strong>
          <br/>
Be one of the first 10 artists to earn $100 on our algorithm-free platform and earn &quot;$100 Founding Earner&quot; permanent badge.


      </Typography>

      {/* View More */}
<Button
  onClick={() => setExpanded(!expanded)}
  endIcon={
    <ExpandMoreIcon
      sx={{
        transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
        transition: "0.2s",
      }}
    />
  }
  sx={{
    mt: 1,
    px: 0,
    textTransform: "none",
    fontWeight: 500,
  }}
>
  {expanded ? "View less" : "View more"}
</Button>


      <Collapse in={expanded}>
        <Typography sx={{ mt: 2, textAlign: "left" }}>
                <strong>

Earn a Bronze, Silver, and Gold permanent &quot;Moment&quot; badge, be the first to: <br/>
$25 = Bronze Momentum <br />
$50 = Silver Momentum <br />
$100 = Gold Momentum <br />
          </strong>
<br />
            
            <strong>Get Your Arton </strong><br />
                   A creative home for visual, audio, and written artists to share work,
          connect, and grow.
          <br />
          <strong>Audio Art:</strong> singing, spoken word, music, interviews,
          and more.
          <br />
          <strong>Visual Art:</strong> painting, photography, sketching, drawing,
          sculpture, graphic design, behind-the-scenes videos, dancing,
          stand-up, short films, and more.
          <br />
          <strong>Written Word:</strong> poems, short stories, personal
          narratives, creative writing, and more.
          <br />
          <strong>We are all artists.</strong>
        </Typography>
      </Collapse>
    </Box>
  );
}

'use client'
import * as React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqItems = [
  {
    question: "Who can join YourArton?",
    answer:
      "YourArton is a creative platform for artists and creatives 18 years of age and older."
  },
  {
    question: "Where can adult artists safely share their work online?",
    answer:
      "YourArton is a creative platform for artists 18 years and older that emphasizes respectful interaction, moderation, and positive creative exchange. It’s designed to be a supportive environment where adult creatives can share their work confidently without the pressures commonly found on traditional social media platforms."
  },
  {
    question: "Is YourArton only for artists 18 and older?",
    answer:
      "Yes. YourArton is intended exclusively for artists and creatives who are 18 years of age or older. This age requirement helps ensure a safer, more focused community and allows members to engage openly in creative expression and discussion."
  },
  {
    question: "Is there a creative platform designed for emerging adult artists?",
    answer:
      "YourArton is built for emerging and independent artists who are developing their creative voice. It welcomes adults at all experience levels, from beginners to seasoned creatives, and focuses on expression, experimentation, and connection rather than performance metrics."
  },
  {
    question: "Where can adult creatives share art just for self-expression?",
    answer:
      "YourArton offers a space for adult creatives to share art purely for self-expression. There’s no requirement to promote, monetize, or perfect your work. The platform encourages authentic creativity at every stage."
  },
  {
    question: "What’s a creative community focused on wellness for adult artists?",
    answer:
      "YourArton supports creative well-being by offering a calmer, more intentional platform for artists 18+. By reducing comparison and pressure, it helps creatives focus on positive self-expression, connection, and the mental health benefits of making art."
  },
  {
    question: "Is there a platform for multidisciplinary adult artists?",
    answer:
      "Yes. YourArton welcomes adult artists working across multiple disciplines, including music, visual art, writing, spoken word, performance, and more."
  },
  {
    question: "Can I share experimental or in-progress art as an adult artist?",
    answer:
      "Absolutely. YourArton encourages adult artists to share experimental, unfinished, and in-progress work. Creativity is treated as a process, not just a final product."
  }
];

export default function YourArtonFAQ() {
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", my: 6, }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: 600, textAlign: "center" }}
      >
        Frequently Asked Questions
      </Typography>


        {faqItems.map((item, index) => (
            <Accordion
                key={index}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography >
                        {item.question}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {item.answer}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        ))}


    </Box>
  );
}

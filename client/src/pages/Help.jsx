import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Container from "@mui/material/Container";
import "../styles/Help.css";
import helpApi from "../api/help.api";
import orderApi from "../api/order.api";

function Help() {
    const [listHelp, setListHelp] = useState([]);

    const handleHelp = () => {
        helpApi.get("gethelp").then((response) => {
            setListHelp(response.data.data);
        });
    };

    useEffect(() => {
        handleHelp();
    }, [listHelp]);

    return (
        <div className="help-page">
            <Container maxWidth="md">
                <Typography
                    variant="h3"
                    color="#e7c2ba"
                    sx={{ marginBottom: "20px" }}
                >
                    How can we help?
                </Typography>
                {listHelp.map((help) => (
                    <Accordion key={help._id} sx={{ marginBottom: "10px" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{help.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{help.answer}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Container>
        </div>
    );
}

export default Help;

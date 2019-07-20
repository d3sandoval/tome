import { makeStyles } from "@material-ui/core";
import React from 'react';
const useStyles = makeStyles(theme => ({
    text: {
        fontFamily: `'Cormorant Garamond', serif`,
        '&::selection': {
            background: theme.palette.primary.light,
            color: 'white',
        }
    }
}))

export default function TextContent() {
    const classes = useStyles();
    return (
        <p className={classes.text}>
            Two roads diverged in a yellow wood,<br/>
            And sorry I could not travel both<br/>
            And be one traveler, long I stood<br/>
            And looked down one as far as I could<br/>
            To where it bent in the undergrowth;<br/>
            <br/>
            Then took the other, as just as fair,<br/>
            And having perhaps the better claim,<br/>
            Because it was grassy and wanted wear;<br/>
            Though as for that the passing there<br/>
            Had worn them really about the same,<br/>
            <br/>
            And both that morning equally lay<br/>
            In leaves no step had trodden black.<br/>
            Oh, I kept the first for another day!<br/>
            Yet knowing how way leads on to way,<br/>
            I doubted if I should ever come back.<br/>
            <br/>
            I shall be telling this with a sigh<br/>
            Somewhere ages and ages hence:<br/>
            Two roads diverged in a wood, and I—<br/>
            I took the one less traveled by,<br/>
            And that has made all the difference.<br/>
        </p>
    )
}
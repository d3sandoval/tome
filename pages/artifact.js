import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '../src/Link';
import Artifact from '../src/organism/artifact';
import Menu from '../src/molecule/menu';


export default function ArtifactPage() {
  return (
    <div>
        <Typography variant="h4" component="h1" gutterBottom>
            Tome
        </Typography>
        <Link href="/about" color="secondary">
            Go to the about page
        </Link>
        <Menu />
        <Artifact />
    </div>
  );
}
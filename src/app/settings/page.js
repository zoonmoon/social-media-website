'use client'

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { ListSubheader, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';

import toast from 'react-hot-toast';

import { useEffect } from 'react';


export default function NestedList() {

    const handleSuccess = (fileUrl) => {
        toast(fileUrl)
    }

    useEffect(() => {

        if(window.innerWidth > 768 && document.querySelector('.footer-fixed')){
          document.querySelector('.footer-fixed').style.display = "block"
        }
    
      }, [])

  return (
    <Paper sx={{marginTop: '20px'}}>

        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <ListItemButton>
                <ListItemIcon>
                <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Basic Information" />
                <ChevronRightIcon />
            </ListItemButton>
            <Link href={'/settings/receiving-account'} style={{color:'black', textDecoration:'none', textDecorationColor:'none'}}>
                <ListItemButton>
                    <ListItemIcon>
                    <MonetizationOnIcon />
                    </ListItemIcon>
                    <ListItemText primary="Receiving PayPal Account" />
                    <ChevronRightIcon />
                </ListItemButton>
            </Link>
        </List>
    </Paper>
  );
}

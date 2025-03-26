import React, { useEffect, useState } from 'react';
import groups from "./groups_data";
import { MenuItem, Select, FormControl, InputLabel, Paper } from '@mui/material';

export default function GroupsDropdown({ handleFeedTypeFilterChange, feedTypeFilter }) {
    const [selectedGroup, setSelectedGroup] = useState('');

    useEffect(()=>{

        if(! (feedTypeFilter.includes(selectedGroup))){
            if(feedTypeFilter.length >0){
                setSelectedGroup(feedTypeFilter[0])
            }else{
                setSelectedGroup('')
            }
            
        }

        if(feedTypeFilter.length == 1){
            setSelectedGroup(feedTypeFilter[0])
        }

        
    }, [feedTypeFilter])

    const handleChange = (event) => {
        setSelectedGroup(event.target.value);
        handleFeedTypeFilterChange(event.target.value);
    };

    return (
        <Paper sx={{ padding:'15px'}}>
            <FormControl fullWidth sx={{border:'none'}}>
                <InputLabel >Filter posts by</InputLabel>
                <Select sx={{border:'none'}} value={selectedGroup} onChange={handleChange}
                    label={'Filter posts by'}
                >
                    {groups.map((group, index) => (
                        <MenuItem key={index} value={group.key}>
                            <div style={{display:'flex', alignItems:'center', gap: '5px'}}>
                                {group.icon}
                                <div>
                                    {group.name}
                                </div>
                            </div>

                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Paper>
    );
}

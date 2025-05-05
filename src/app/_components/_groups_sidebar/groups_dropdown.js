import React, { useEffect, useState } from 'react';
import groups from "./groups_data";
import { MenuItem, Select, FormControl, InputLabel, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
export default function GroupsDropdown({handleFilterReset, handleFeedTypeFilterChange, feedTypeFilter }) {
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

        console.log(feedTypeFilter)
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
                    {
                        feedTypeFilter.length > 0 && (
                            <MenuItem value={''}>
                                <div onClick={handleFilterReset} style={{display:'flex', alignItems:'center', gap: '5px'}}>
                                    <DeleteIcon />
                                    <div>
                                        Clear Filter
                                    </div>
                                </div>
                            </MenuItem>
                        )
                    }
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

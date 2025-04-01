'use client'
import { Divider, Paper, Skeleton, Stack, Typography } from "@mui/material"
import Link from "next/link"
import { useEffect, useState } from "react"
import CheckIcon from '@mui/icons-material/Check';
import { Button } from "@mui/joy";
import CircleIcon from '@mui/icons-material/Circle';
export default function User({params}){

    const [notifications, setNotifications] = useState([])
    const [isLoading, setIsLoading] = useState(true) 
    const[markingAsRead, setMarkingAsRead] = useState(false)

    useEffect(()=> {
        async function fetchData(){
            try{
                setIsLoading(true)
                const notificationResp = await fetch('/api/notifications')
                const notificationJSON = await notificationResp.json()
                const notifications = notificationJSON.notifications 
                setNotifications(notifications) 
            }catch(error){
                
            }finally{
                setIsLoading(false)
            }
        }

        fetchData()

    }, [])

    if(isLoading){
        
        return (
            <Paper sx={{padding: '15px', marginTop: '20px'}}>
                <Stack spacing={3}>
                    <Skeleton variant="rectangular" width={'100%'} height={50} />
                    <Skeleton variant="rectangular" width={'100%'} height={50} />
                    <Skeleton variant="rectangular" width={'100%'} height={50} />
                    <Skeleton variant="rectangular" width={'100%'} height={50} />
                </Stack>
            </Paper>
        )

    }

    const handleMarkAsRead = async () => {
        setMarkingAsRead(true)
        await fetch('/api/notifications/mark-all-read')
        location.reload()
    }

    return(
        <Paper sx={{marginTop:'20px'}}>
            
            {
                notifications.length > 0 ?
                    <> 
                    <div style={{padding:'10px', paddingTop:'15px',paddingBottom:'15px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <Typography variant="h6">Notifications</Typography>
                        {
                            notifications.filter(n => n.is_read == 0).length  > 0
                                ? <>
                                    <Button loading={markingAsRead} onClick={handleMarkAsRead} variant={'outlined'} startDecorator={<CheckIcon />}>Mark as Read</Button>
                                </>
                                : <></>
                        }       
                    </div>
                    <Divider sx={{marginBottom:'5px'}}></Divider>

                    <Stack direction={'column'}  spacing={1}>

                        {
                            notifications.map((n,index) => {
                                const [link, info] = (() => {
                                    switch(n.event){
                                        case 'post_like':
                                            return ['/posts/'+n.subject, 'liked your post']
                                        case 'post_comment':
                                            return ['/posts/' + n.subject, 'commented on your post']
                                        case 'follow':
                                            return ['/users' + n.caused_by_user, 'followed you']
                                    }
                                })()
                                return(
                                    <>
                                        <div key={index}>
                                            <Link 
                                                style={{
                                                    textDecoration:'none'

                                                }} 
                                                href={link} >
                                                <div
                                                    style={{    
                                                        display:'flex',                                                display:'flex',
                                                        gap: '5px',
                                                        justifyContent:'space-between',
                                                        color:'black',
                                                        padding:'10px',
                                                        paddingLeft:'10px'
                                                    }}
                                                >
                                                    <div>
                                                        <strong>@{n.caused_by_user.split('-').slice(0, -1).join('-')+'  '}</strong>
                                                        <span>
                                                            {info}
                                                        </span>
                                                    </div>
                                                    <div style={{display:'flex', gap:'5px', alignItems:'center'}}>
                                                        {
                                                            n.is_read == 0 
                                                                ? <CircleIcon fontSize={'small'} color={'error'}/>
                                                                : <></>
                                                        }
                                                        <span style={{color:'rgba(0,0,0,0.6)'}}>
                                                            {n.created_at}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                        <Divider></Divider>
                                    </>
                                )
                            })
                        }
                    </Stack>
                        </>
                : 
                
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <Typography variant="h6">No any notifications</Typography>
                    </div>
            
            }

        </Paper>

    )
}
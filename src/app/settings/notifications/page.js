'use client'

import {
    Alert,
    Divider,
    Paper,
    Skeleton,
    Stack,
    Switch,
    FormControlLabel,
    Typography
} from "@mui/material"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function EmailNotificationSetting() {

    const [enabled, setEnabled] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        async function fetchSetting() {
            try {
                setIsLoading(true)

                const res = await fetch('/api/user-notifications')
                const json = await res.json()

                if(json?.msg == "Please log in")
                    window.location.href="/login?on_login_redirect_to=/settings/notifications"

                setEnabled(Boolean(json?.result?.enabled))
            } catch (e) {
                toast.error('Failed to load email settings')
            } finally {
                setIsLoading(false)
            }
        }

        fetchSetting()
    }, [])

    const toggleSetting = async (e) => {
        const newValue = e.target.checked
        setEnabled(newValue)

        try {
            setIsSaving(true)

            const res = await fetch('/api/user-notifications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ enabled: newValue })
            })

            const json = await res.json()

            if (json.success === false) {
                throw new Error(json.msg || 'Failed to save')
            }

            toast.success('Setting saved!')
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return (
            <Paper sx={{ padding: '15px', marginTop: '20px' }}>
                <Stack spacing={3}>
                    <Skeleton variant="rectangular" width="100%" height={40} />
                </Stack>
            </Paper>
        )
    }

    return (
        <Paper sx={{ padding: '15px', marginTop: '20px' }}>

            <Alert severity="info">
                Control whether you receive email notifications.
            </Alert>

            <Stack spacing={2} sx={{ marginTop: '15px' }}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={enabled}
                            onChange={toggleSetting}
                            disabled={isSaving}
                        />
                    }
                    label={
                        <Typography>
                            Email notifications
                        </Typography>
                    }
                />
            </Stack>

            <Divider sx={{ marginTop: '15px' }} />
        </Paper>
    )
}

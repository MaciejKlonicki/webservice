
import { Box, Rating, Typography } from '@mui/material'

const RatingBox = ({ value, onChange, disabled, t, customStyle  }) => {

    const defaultStyle = { marginRight: '30px' }
    const mergedStyle = { ...defaultStyle, ...customStyle }

    return (
        <Box
            sx={{
                '& > legend': { mt: 2 },
                marginRight: '10px',
            }}
        >
            <Typography style={{ color: 'white' }} component="legend">
                {t('Rate.1')}
            </Typography>
            <Rating
                style={mergedStyle}
                name="simple-controlled"
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </Box>
    )
}

export default RatingBox
import { Box, Typography } from '@mui/material';

interface PlaceholderImageProps {
  text?: string;
  width?: string | number;
  height?: string | number;
  color1?: string;
  color2?: string;
  fontSize?: string | number;
}

const PlaceholderImage = ({
  text = 'イメージ',
  width = '100%',
  height = 180,
  color1 = '#3f51b5',
  color2 = '#f50057',
  fontSize = '1rem'
}: PlaceholderImageProps) => {
  return (
    <Box
      sx={{
        width,
        height,
        background: `linear-gradient(45deg, ${color1}, ${color2})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        borderRadius: 1,
        overflow: 'hidden'
      }}
    >
      <Typography sx={{ fontSize, textAlign: 'center', padding: 2 }}>
        {text}
      </Typography>
    </Box>
  );
};

export default PlaceholderImage;
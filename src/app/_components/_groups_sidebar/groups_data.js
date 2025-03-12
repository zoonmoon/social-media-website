import { Home, AccessAlarm, Favorite } from '@mui/icons-material'; // Import icons
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import MicIcon from '@mui/icons-material/Mic';
import PanoramaIcon from '@mui/icons-material/Panorama';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
const groups = [
    {
        name: "Visual",
        key: "visual",
        icon: <PanoramaIcon fontSize="small" />,
        image_src: '/site-assets/group_visual_art.jpeg'
    },
    {
        name: "Audio",
        key: "audio",
        icon: <MicIcon fontSize="small" />,
        image_src: '/site-assets/group_audo_art.jpg'
    },
    {
        name: "Written Word",
        key: "written_word",
        icon: <WysiwygIcon fontSize="small" />,
        image_src: '/site-assets/group_visual_art.jpeg'
    }
];

export default groups;

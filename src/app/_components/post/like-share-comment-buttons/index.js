import { Button } from "@mui/joy";
import ShareButton from "../../modals/share-posts";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { CardActions, Divider, Stack, useMediaQuery, useTheme } from "@mui/material";
import { SupportButton } from "../../modals/support-artist";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

export default function LikeShareCommentButtons({ handleLikeUnlike, p, isLiked, isLikingOrUnliking, handleDisplayChange }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check for mobile screen

  return (
    <>
      <Stack spacing={2} sx={{ marginTop: '10px' }}>
        <Divider />
        <CardActions className="post-card-actions-wrapper" sx={{ marginTop: 0, paddingTop: '0', display:'flex', flexGrow: 1, width:'inherit' }}>
          {p.is_editable !== 1 ? (
            <>
              <SupportButton
                type={'button'}
                toBeSupportedID={p.posted_by_username}
                firstName={p.posted_by_name.split(' ')[0].toUpperCase()}
              />
            </>
          ) : ''}
          
          {/* Like Button */}
          <Button
            color={isLiked ? 'success' : 'neutral'}
            variant={'outlined'}
            startDecorator={isLiked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
            sx={{
              opacity: '1!important',
              width: isMobile ? '33%' : 'auto'  // Adjust width for mobile
            }}
            onClick={isLikingOrUnliking ? () => {} : handleLikeUnlike}
            fullWidth
          >
            {!isMobile && (isLiked ? 'Liked' : 'Like')}
          </Button>

          {/* Comment Button */}
          <Button
            color={'neutral'}
            variant={'outlined'}
            startDecorator={<CommentIcon />}
            sx={{
              opacity: '1!important',
              width: isMobile ? '33%' : 'auto'  // Adjust width for mobile
            }}
            fullWidth
            onClick={() => handleDisplayChange('comments')}
          >
            {!isMobile && 'Comment'}
          </Button>

          {/* Share Button */}
          <ShareButton postID={p.id} />
        </CardActions>
      </Stack>
    </>
  );
}

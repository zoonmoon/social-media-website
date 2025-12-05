'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import toast from 'react-hot-toast';

function getFirst10WordsFromHTML(html) {
  // Create a temporary DOM element to strip HTML tags
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const text = tempDiv.textContent || tempDiv.innerText || "";

  // Get the first 10 words
  const words = text.trim().split(/\s+/).slice(0, 10);
  return words.join(" ");

}

export default function BlogPost({blogPost}) {
  const [isDeleting, setIsDeleting] = React.useState(false)
  const deleteBlog = async (slug) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    
    if (!confirmDelete) return; // If user selects "No", stop here
  
  
    try{
      setIsDeleting(true)
const response = await fetch('/api/admin/blogs/' + encodeURIComponent(slug), {
  method: 'DELETE',
});
      const responseJSON = await response.json()
      if(responseJSON.success === true) location.reload() 
      else throw new Error(responseJSON.message)
      toast(responseJSON.message)
    }catch(error){
      toast(error.message)
    }finally{
      setIsDeleting(false)
    }
  }


  return (
    <Card>
      <Link 
  href={`/blogs/${encodeURIComponent(blogPost.slug)}`} 
  style={{ textDecoration: 'none', color: 'unset' }}
>

      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image={ (!blogPost.thumbnail || blogPost.thumbnail == null || blogPost.thumbnail == '') 
          ?  '/site-assets/default-blog-image.png'
          : blogPost.thumbnail
        }
      />
      
      <CardContent>
        <Typography gutterBottom variant={'body1'} component="div">
          {blogPost.title}
        </Typography>
      </CardContent>
      </Link> 
      {
        blogPost.editable && (
          <CardActions>
            <Link  href = {'/admin/blogs/edit/'+blogPost.slug}><Button disabled={isDeleting} size="small">Edit</Button></Link>
            <Button disabled={isDeleting} size="small" onClick={() => deleteBlog(blogPost.slug)}>Delete</Button>
          </CardActions>
        )
      }

    </Card>
  );
}

'use client'
import { Container, Paper } from "@mui/material";
import Header from "@/app/_components/_header";
import { useState, useEffect } from "react";
import LoadingPost from "@/app/_components/_loading-post";
import toast from "react-hot-toast";
import {BlogComposer} from "../../create/page";

export default function CreateBlog({ params }) {

  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const response = await fetch('/api/admin/blogs-v2/' + params.slug);
      const responseJSON = await response.json();

      if (!responseJSON.success) throw new Error("Failed to load blog");
      if (!responseJSON.blog || responseJSON.blog.length === 0)
        throw new Error("Blog not found");

      setBlog(responseJSON.blog[0]);

    } catch (error) {
      toast.error(error.message || "Error loading blog");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ CORRECT HOOK
  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <>
      <Header />

      <Container maxWidth="lg" sx={{ marginTop: '20px', marginBottom: '100px' }}>
        {isLoading ? (
          <LoadingPost />
        ) : (
          <Paper sx={{ padding: '20px' }}>
            <BlogComposer
              id={blog.id}
              blocks={blog.blocks ? JSON.parse(blog.blocks) : []}
              title={blog.title || ""}
              thumbnail={blog.thumbnail || ""}
              meta_title={blog.meta_title || ""}
              meta_description={blog.meta_description || ""}
            />
          </Paper>
        )}
      </Container>
    </>
  );
}

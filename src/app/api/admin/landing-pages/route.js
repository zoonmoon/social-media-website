function createSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')   // remove special chars
    .replace(/\s+/g, '-')           // spaces → dash
    .replace(/-+/g, '-');           // collapse dashes
}


import { databaseConnection, executeQuery, isAdmin } from "../../utils";

export async function POST(req) {
  try {
    const user = await isAdmin(req);
    if (!user) {
      return Response.json({ success: false, msg: "Unauthorized" }, { status: 401 });
    }

    const {
      title,
      meta_title,
      meta_description,
      thumbnail,
      html,
      blocks,
      author = null,
    } = await req.json();

    if (!title) {
      return Response.json({ success: false, msg: "Title is required" }, { status: 400 });
    }

    const slug = createSlug(title);
    const connection = await databaseConnection();

    const query = `
      INSERT INTO dynamic_pages
      (
        title,
        slug,
        content,
        author,
        status,
        thumbnail,
        meta_title,
        meta_description,
        blocks,
        version
      )
      VALUES (
        ${connection.escape(title)},
        ${connection.escape(slug)},
        ${connection.escape(html)},
        ${connection.escape(author)},
        'published',
        ${connection.escape(thumbnail)},
        ${connection.escape(meta_title)},
        ${connection.escape(meta_description)},
        ${connection.escape(JSON.stringify(blocks || []))},
        2
      )
    `;

    await executeQuery(connection, query);

    return Response.json({
      success: true,
      message: "Blog created successfully",
    });

  } catch (err) {
    console.error(err);
    return Response.json({ success: false, msg: "Server error" }, { status: 500 });
  }
}


export async function PUT(req) {
  try {
    const user = await isAdmin(req);
    if (!user) {
      return Response.json({ success: false, msg: "Unauthorized" }, { status: 401 });
    }

    const {
      id,
      title,
      meta_title,
      meta_description,
      thumbnail,
      html,
      blocks,
      author = null,
    } = await req.json();

    if (!id || !title) {
      return Response.json(
        { success: false, msg: "ID and title are required" },
        { status: 400 }
      );
    }

    const slug = createSlug(title);
    const connection = await databaseConnection();
    
    const query = `
      UPDATE dynamic_pages SET
        title = ${connection.escape(title)},
        content = ${connection.escape(html)},
        author = ${connection.escape(author)},
        status = 'published',
        thumbnail = ${connection.escape(thumbnail)},
        meta_title = ${connection.escape(meta_title)},
        meta_description = ${connection.escape(meta_description)},
        blocks = ${connection.escape(JSON.stringify(blocks || []))},
        version = 2,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${connection.escape(id)}
    `;

    await executeQuery(connection, query);

    return Response.json({
      success: true,
      message: "Blog updated successfully",
    });

  } catch (err) {
    console.error(err);
    return Response.json({ success: false, msg: "Server error" }, { status: 500 });
  }
}

export async function GET(request){
    
    let connection = false 
    
    try{
        
        let query = `
            SELECT id, version, title, slug, author, created_at, status, thumbnail FROM dynamic_pages ORDER BY created_at DESC LIMIT 20
        `

        connection = await databaseConnection()

        let blogs = await executeQuery(connection, query)
        
        return new Response(JSON.stringify({success:true, hasAdminAccess: isAdmin(), blogs: blogs.map(r => ({...r, content: '', editable: isAdmin()})) }))

    }catch(error){  

        return new Response(JSON.stringify({success:false, message:error.message}))

    }finally{
        if(connection) connection.end()
    }
}
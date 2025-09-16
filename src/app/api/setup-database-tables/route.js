import {  databaseConnection, executeQuery} from '@/app/api/utils'

export  async function GET(request) {

    const connection = await databaseConnection();


    let queries = [
        `
CREATE table profile_views ( 
	id INT PRIMARY KEY auto_increment, 
	viewer VARCHAR(255) NOT NULL,
	viewee VARCHAR(255) NOT NULL,
	viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	foreign key (viewer) references users(username) ON DELETE CASCADE,
	foreign key (viewee) references users(username) ON DELETE CASCADE
)
`,
`

CREATE TABLE followers ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    username VARCHAR(255) NOT NULL,
    follower VARCHAR(255) NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE,
    FOREIGN KEY (follower) REFERENCES users(username) ON DELETE CASCADE,
    UNIQUE(username, follower)
);

`,

`

CREATE table post_likes ( 
	id INT PRIMARY KEY auto_increment, 
	post_id VARCHAR(255) NOT NULL,
    username  VARCHAR(255) NOT NULL,
    foreign key (post_id) references posts(id) on delete cascade,
    foreign key (username) references users(username) on delete cascade,
    unique(post_id, username)
)
`,

`
CREATE TABLE supports (
	id INT PRIMARY KEY auto_increment,
	supported_by VARCHAR(255),
    supported_to VARCHAR(255),
	FOREIGN KEY (supported_by) REFERENCES users(username) ON DELETE CASCADE,
    FOREIGN KEY (supported_to) REFERENCES users(username) ON DELETE CASCADE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount float
);
`,

`

CREATE table post_comments ( 
	id INT PRIMARY KEY auto_increment, 
	post_id VARCHAR(255) NOT NULL,
    username  VARCHAR(255) NOT NULL,
    cmt TEXT,
    parent_id INT DEFAULT 0,
    created_at timestamp DEFAULT current_timestamp,
    foreign key (post_id) references posts(id) on delete cascade,
    foreign key (username) references users(username) on delete cascade,
    FOREIGN KEY (parent_id) REFERENCES post_comments(id) ON DELETE CASCADE -- self-referencing parent_id
)
`,


`
CREATE table post_views ( 
	id INT PRIMARY KEY auto_increment, 
	post_id VARCHAR(255) NOT NULL,
    username  VARCHAR(255) NOT NULL,
	viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (post_id) references posts(id) on delete cascade,
    foreign key (username) references users(username) on delete cascade
)
`
    ]

    // Save the title and filenames in the MySQL database
    let query = `
        CREATE TABLE IF NOT EXISTS users(
            username VARCHAR(255) PRIMARY KEY,
            email VARCHAR(255),
            password VARCHAR(255),
            google_id VARCHAR(1000),
            facebook_id VARCHAR(1000),
            PRIMARY KEY(username)
        )
    `;

    let result = await executeQuery(connection, query)
    

    query = `
        CREATE TABLE IF NOT EXISTS user_more_info(
            username VARCHAR(255),
            name VARCHAR(255),
            profile_pic_src VARCHAR(5000) DEFAULT NULL,
            cover_pic_src VARCHAR(5000) DEFAULT NULL,
            PRIMARY KEY(username),
            FOREIGN KEY (username) REFERENCES users(username)
        )
    `;

    result = await executeQuery(connection, query)
    

    query = `
        CREATE TABLE IF NOT EXISTS posts(
            id VARCHAR(255),
            username VARCHAR(255),
            posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            caption TEXT DEFAULT NULL,
            PRIMARY KEY(id),
            FOREIGN KEY (username) REFERENCES users(username)
        )
    `;
    result = await executeQuery(connection, query)

    
    query = `
        CREATE TABLE IF NOT EXISTS posts_media(
            id VARCHAR(255),
            post_id VARCHAR(255),
            thumbnail VARCHAR(1000),
            media_src VARCHAR(5000),
            media_type VARCHAR(5000),
            PRIMARY KEY(id),
            FOREIGN KEY (post_id) REFERENCES posts(id)
        )
    `;
    result = await executeQuery(connection, query)
    

    connection.end(err => {
    })

    return new Response(JSON.stringify({ success: false, msg: 'Setup'  }), {
        headers: {
            "Content-Type": "application/json"
        },
        status: 200
    });

}
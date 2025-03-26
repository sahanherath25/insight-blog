import React from 'react';

async function BlogDetailPage({req, params}) {

    const obj=await params;

    console.log("OBJECT IS ",obj)

    return (
        <div>

        </div>
    );
}

export default BlogDetailPage;
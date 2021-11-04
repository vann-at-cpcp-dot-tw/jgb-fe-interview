import { isEmpty, fetchAPI } from 'src/mixin/methods'


//取得所有 cat 的 slug
export async function getAllCatSlugs() {
   //exclude:"1" 排除未分類
  const data = await fetchAPI(
    `query MyQuery {
      categories(where: {exclude: "1"}) {
        nodes {
          slug
          name
        }
      }
    }`,
    {
      variables: {},
    }
  )
  return data.categories.nodes
}


//取得所有 post slug
export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    query MyQuery {
      posts(first: 10000) {
        nodes {
          slug
        }
      }
    }
  `,
  {
    variables: {},
  }
  )
  return data
}


//取得 viewer
export async function getViewer(){

  const headers = {
    'Content-Type': 'application/json',
    // 'Cache-Control': 'no-cache',
    // 'Cache': 'no-cache',
  }

  const result  = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/graphql`, {
    method: 'POST',
    cache: 'no-cache',
    credentials: process.env.NODE_ENV == 'development' ?'same-origin' :'include',
    headers,
    body: JSON.stringify({
      query: `
        query MyQuery {
          viewer {

            userId
            email
            roles {
              nodes {
                name
              }
            }
            firstName
            userInfo {
              birthday
              avatar
              education
              job
              interested
              relatedResearch
              relatedResearchNote
            }

          }
        }
      `,
    }),
  })

  const json = await result.json()

  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data?.viewer
}


//取得 post 內容
export async function getPost({slug, preview, previewData}={}) {


  // const postPreview = preview && previewData?.post

  // // The slug may be the id of an unpublished post
  // const isId = Number.isInteger(Number(slug))
  // const isSamePost = isId ?Number(slug) === postPreview.id :slug === postPreview.slug
  // const isDraft = isSamePost && postPreview?.status === 'draft'


  // const data = await fetchAPI(
  //   `query PostBySlug($id: ID!) {
  //    post(id: $id, idType: ${isDraft ?'DATABASE_ID' :'SLUG'}) {
  //       ${queryStrings.postContent}
  //     }
  //   }
  // `,
  //   {
  //     variables: {
  //       id: isDraft ? postPreview.id : slug,
  //     },
  //   }
  // )

  // // Draft posts may not have an slug
  // if (isDraft){ data.post.slug = postPreview.id }



  const isId = Number.isInteger(Number(slug))
  const data = await fetchAPI(
    `query PostBySlug($id: ID!) {
     post(id: $id, idType: ${isId ?'DATABASE_ID' :'SLUG'}) {
        ${queryStrings.postContent}
      }
    }
  `,
    {
      variables: {
        id: slug,
      },
    }
  )

  return data.post
}

//取得 preview 資訊
export async function getPreviewPost({id, idType='DATABASE_ID'}) {
  if( !id ){
    return {}
  }

  const data = await fetchAPI(
    `query PreviewPost {
      post(id: ${id}, idType: ${idType}) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: {},
    }
  )

  return data
}

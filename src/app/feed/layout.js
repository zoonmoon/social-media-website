import Header from "../_components/_header"


export async function generateMetadata({params}) {

//  console.log(post)
  return {
    title: "Social Platform for Artists | Digital Art, Dance & Music Community Site",
    description: "Join YourArtOn — a positive, artist community network and social platform for artists. Join a creative art feed to share, connect, and feel supported!"
  }
}


export default function DashboardLayout({ children }) {
    return( 
        <>
            <Header />
            <div>
                {children}
            </div>
        </>
    )
}
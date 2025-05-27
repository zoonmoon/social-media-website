import Header from "../_components/_header"
export default function DashboardLayout({ children }) {
    return( 
        <>
            <Header />
            <div>
                <div style={{position:'fixed', zIndex:-1, top:0, left:0 , width:'100%', height: '100%', backgroundSize:'cover', backgroundImage: 'url("/site-assets/feed-bg.jpg")', backgroundRepeat:'repeat'}}>
                </div>
                {children}
            </div>
        </>
    )
}
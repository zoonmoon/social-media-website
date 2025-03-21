import Header from "../_components/_header"
export default function DashboardLayout({ children }) {
    return( 
        <section className="feed-page">
            <Header />
            <div style={{marginTop: '70px'}}>
                {children}
            </div>
        </section>
    )
}
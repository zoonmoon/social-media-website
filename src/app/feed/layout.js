import Header from "../_components/_header"
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
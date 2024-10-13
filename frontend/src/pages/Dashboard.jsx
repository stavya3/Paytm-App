import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { DashboardComp } from "../components/DashboardComp"
import { Sidebar } from "../components/Sidebar"

// export const Dashboard = () => {
//     return <div>
//         <Appbar />
//         <div className="m-8">
//             <Balance value={"10,000"} />
//             <Users />
//         </div>
        
//     </div>
// }

export const Dashboard = () => {
    return <main className="grid gap-4 p-4 grid-cols-[200px,_1fr]">
        <Sidebar />
        <DashboardComp />
    </main>
}
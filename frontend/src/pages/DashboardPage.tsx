import { DashboardTable } from "../component/dashboard/DashboardTable"
import { NavBarComponent } from "../component/navbar/NavBar"

export const DashboardPage: React.FC = () => {
    return (
        <>
            <NavBarComponent />
            <DashboardTable />
        </>
    )
}
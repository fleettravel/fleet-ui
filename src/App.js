import { Routes, Route } from "react-router-dom";
// Must load before app.sass — app.sass's dateRangePicker.sass block
// overrides react-day-picker's own CSS custom properties (--rdp-day-width,
// etc), which only wins if this stylesheet is earlier in the bundle.
// Previously imported per-component (DateRange/DateSingle's own index.js),
// which put it AFTER app.sass in the bundle instead (components load later
// than the top-level app.sass import), silently overriding every
// --rdp-*/font-size/font-weight/flex-wrap override below with react-day-
// picker's own defaults — confirmed by hand in the compiled CSS output.
import "react-day-picker/style.css";
import "./styles/app.sass";
import Page from "./components/Page";
import Stays from "./pages/stays/StaysHome";
import StaysCategory from "./pages/stays/StaysCategory";
import StaysProduct from "./pages/stays/StaysProduct";
import StaysCheckout from "./pages/stays/StaysCheckout";
import StaysCheckoutComplete from "./pages/stays/StaysCheckoutComplete";
import FullPhoto from "./pages/FullPhoto";
import HostProfile from "./pages/HostProfile";
import ProfileUser from "./pages/profile";
import AccountSettings from "./pages/AccountSettings";
import Support from "./pages/Support";
import PageList from "./pages/PageList";
import MessageCenter from "./pages/MessageCenter";
import Wishlists from "./pages/Wishlists";
import YourTrips from "./pages/YourTrips";
import Bookings from "./pages/Bookings";
import ListYourProperty from "./pages/ListYourProperty";

function App() {
    return (
        <Routes>
            <Route path="/">
                <Route
                    index
                    element={
                        <Page>
                            <Stays />
                        </Page>
                    }
                />
                <Route
                    path="stays-category"
                    element={
                        <Page notAuthorized>
                            <StaysCategory />
                        </Page>
                    }
                />
                <Route
                    path="stays-product"
                    element={
                        <Page separatorHeader>
                            <StaysProduct />
                        </Page>
                    }
                />
                <Route
                    path="stays-product/:stayId"
                    element={
                        <Page separatorHeader>
                            <StaysProduct />
                        </Page>
                    }
                />
                <Route
                    path="stays-checkout"
                    element={
                        <Page separatorHeader>
                            <StaysCheckout />
                        </Page>
                    }
                />
                <Route
                    path="stays-checkout-complete"
                    element={
                        <Page separatorHeader>
                            <StaysCheckoutComplete />
                        </Page>
                    }
                />
                <Route
                    path="full-photo"
                    element={
                        <Page separatorHeader>
                            <FullPhoto />
                        </Page>
                    }
                />
                <Route path="full-photo/:stayId" element={<Page separatorHeader><FullPhoto /></Page>} />
                <Route
                    path="messages"
                    element={
                        <Page separatorHeader fooferHide wide>
                            <MessageCenter />
                        </Page>
                    }
                />
                <Route
                    path="wishlists"
                    element={
                        <Page separatorHeader>
                            <Wishlists />
                        </Page>
                    }
                />
                <Route
                    path="bookings"
                    element={
                        <Page separatorHeader>
                            <Bookings />
                        </Page>
                    }
                />
                <Route
                    path="your-trips"
                    element={
                        <Page separatorHeader>
                            <YourTrips />
                        </Page>
                    }
                />
                <Route
                    path="list-your-property"
                    element={
                        <Page separatorHeader>
                            <ListYourProperty />
                        </Page>
                    }
                />
                <Route
                    path="profile"
                    element={
                        <Page>
                            <ProfileUser />
                        </Page>
                    }
                />
                <Route
                    path="host-profile"
                    element={
                        <Page>
                            <HostProfile />
                        </Page>
                    }
                />
                <Route
                    path="account-settings"
                    element={
                        <Page>
                            <AccountSettings />
                        </Page>
                    }
                />
                <Route
                    path="support"
                    element={
                        <Page>
                            <Support />
                        </Page>
                    }
                />
                <Route path="/pagelist" element={<PageList />} />
            </Route>
        </Routes>
    );
}

export default App;

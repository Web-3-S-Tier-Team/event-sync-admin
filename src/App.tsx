import { Admin, Resource } from "react-admin";
import EventIcon from "@mui/icons-material/Event";

import { EventList } from "./events/EventList";
import { EventCreate } from "./events/EventCreate";
import { EventEdit } from "./events/EventEdit";
import { EventShow } from "./events/EventShow";

import { Dashboard } from "./Dashboard";
import { Layout } from "./Layout";
import { dataProvider } from "./providers/dataProvider";
import { authProvider } from "./providers/authProvider";
import { LoginPage } from "./providers/LoginPage";
import { lightTheme } from "./themes/lightTheme";
import { darkTheme } from "./themes/darkTheme";

function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
      dashboard={Dashboard}
      layout={Layout}
      theme={lightTheme}
      darkTheme={darkTheme}
      requireAuth
    >
      <Resource
        name="events"
        list={EventList}
        create={EventCreate}
        edit={EventEdit}
        show={EventShow}
        icon={EventIcon}
        options={{ label: "Événements" }}
        recordRepresentation={(r) => r.title}
      />
    </Admin>
  );
}

export default App;

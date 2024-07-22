import Nav from 'react-bootstrap/Nav';
import { useState } from 'react';

function NavPills({ defaultTabId, tabItems }) {
  //Finds default tab, else assings the first as default
  const defaultTab = defaultTabId ? tabItems.find((item) => item.id === defaultTabId) : tabItems[0];
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <>
      <Nav variant="pills" className="custom-pill-nav">
        {tabItems &&
          tabItems.map((tab) => (
            <Nav.Item className="custom-nav-item" key={tab.id}>
              <Nav.Link eventKey={tab.id} active={tab.id === activeTab.id} onClick={() => setActiveTab(tab)}>
                {tab.tabIcon && (
                  <div style={{ height: '20px', width: '20px', marginRight: '0.5em' }}>{tab.tabIcon}</div>
                )}
                {tab.tabLabel}
              </Nav.Link>
            </Nav.Item>
          ))}
      </Nav>
      {activeTab.tabComponent}
    </>
  );
}

export default NavPills;

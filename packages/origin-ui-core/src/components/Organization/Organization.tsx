import React from 'react';
import { PageContent } from '../PageContent/PageContent';
import { useSelector } from 'react-redux';
import { useLinks } from '../../utils/routing';
import { getUserOffchain, getIsLeadUser } from '../../features/users/selectors';
import { NavLink, Route, Redirect } from 'react-router-dom';
import { OrganizationForm } from './OrganizationForm';
import { OrganizationTable } from './OrganizationTable';
import { OrganizationView } from './OrganizationView';
import { OrganizationInvite } from './OrganizationInvite';
import { OrganizationInvitations } from './OrganizationInvitations';

export function Organization() {
    const userOffchain = useSelector(getUserOffchain);
    const isLeadUser = useSelector(getIsLeadUser);

    const { getOrganizationLink } = useLinks();

    const isLoggedIn = Boolean(userOffchain);

    const Menu = [
        {
            key: 'organization-register',
            label: 'Register',
            component: OrganizationForm,
            hide: !isLoggedIn
        },
        {
            key: 'organization-table',
            label: 'All organizations',
            component: OrganizationTable,
            hide: !isLoggedIn
        },
        {
            key: 'organization-invitations',
            label: 'Invitations',
            component: OrganizationInvitations,
            hide: !isLoggedIn
        },
        {
            key: 'organization-invite',
            label: 'Invite',
            component: OrganizationInvite,
            hide: !isLoggedIn || !isLeadUser
        },
        {
            key: 'organization-view',
            label: 'View',
            component: OrganizationView,
            hide: true
        }
    ];

    return (
        <div className="PageWrapper">
            <div className="PageNav">
                <ul className="NavMenu nav">
                    {Menu.map(menu => {
                        if (menu.hide) {
                            return null;
                        }

                        return (
                            <li key={menu.key}>
                                <NavLink
                                    exact={true}
                                    to={`${getOrganizationLink()}/${menu.key}`}
                                    activeClassName="active"
                                >
                                    {menu.label}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <Route
                path={`${getOrganizationLink()}/:key/:id?`}
                render={props => {
                    const key = props.match.params.key;
                    const matches = Menu.filter(item => {
                        return item.key === key;
                    });

                    return (
                        <PageContent
                            menu={matches.length > 0 ? matches[0] : null}
                            redirectPath={getOrganizationLink()}
                        />
                    );
                }}
            />

            <Route
                exact={true}
                path={`${getOrganizationLink()}`}
                render={() => (
                    <Redirect to={{ pathname: `${getOrganizationLink()}/${Menu[0].key}` }} />
                )}
            />
        </div>
    );
}

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

// Icons
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import PostAddIcon from '@material-ui/icons/PostAdd';
import WorkIcon from '@material-ui/icons/Work';
import MapIcon from '@material-ui/icons/Map';
import ForumIcon from '@material-ui/icons/Forum';

export const mainListItems = (
    <div>
        <Link to="/" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
        </Link>
        <Link to="/searchjobs" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <WorkIcon />
                </ListItemIcon>
                <ListItemText primary="Search Jobs" />
            </ListItem>
        </Link>
        <Link to="/postjobs" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <PostAddIcon />
                </ListItemIcon>
                <ListItemText primary="Add job opening" />
            </ListItem>
        </Link>
        <Link to="/searchtalent" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Search Talent" />
            </ListItem>
        </Link>
        <Link to="/posttalent" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <EmojiPeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Add Talent" />
            </ListItem>
        </Link>
        <Link to="/jobmap" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <MapIcon />
                </ListItemIcon>
                <ListItemText primary="Job Map" />
            </ListItem>
        </Link>
    </div>
);

export const secondaryListItems = (
    <div>
        <Link to="/sharencare" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ForumIcon />
                </ListItemIcon>
                <ListItemText primary="Share N' Care :D" />
            </ListItem>
        </Link>
    </div>
);

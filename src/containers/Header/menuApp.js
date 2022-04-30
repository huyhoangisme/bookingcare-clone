export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.react-manage',
                link: '/system/user-manage'
            },
            {
                name: 'menu.admin.redux-manage',
                link: '/system/user-redux'
                // subMenus: [
                //     { name: 'menu.system.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.product-manage', link: '/system/user-redux' },
                // ]
            },
            {
                name: 'menu.admin.doctor-manage',
                link: '/system/manage-doctor'
            },
            {
                name: 'menu.admin.schedule-doctor',
                link: '/system/doctor/manage-doctor'
            }
        ],
    },
    {
        // quản lí phòng khám
        name: 'menu.admin.clinic', menus: [
            { name: 'menu.admin.clinic-manage', link: '/system/manage-clinic' },
            { name: 'menu.admin.create-clinic', link: '/system/create-clinic' },
        ]
    }
    , {
        // quản lí chuyên khoa
        name: 'menu.admin.specialty', menus: [
            { name: 'menu.admin.specialty-manage', link: '/system/specialty-manage' },
            { name: 'menu.admin.create-specialty', link: '/system/create-specialty' }
        ]
    }, {
        // quản lí cẩm nang
        name: 'menu.admin.hanbook', menus: [
            { name: 'menu.admin.hanbook-manage', link: '/system/hanbook-manage' }
        ]
    }
];
// memu cua doctor
export const doctorMenu = [
    // {
    //     // name: 'menu.dashboard.home',
    //     // menus: [
    //     //     {
    //     //         name: 'menu.dashboard.home', link: '/home'
    //     //     }
    //     // ]
    // },
    {
        name: 'menu.doctor.manage-doctor',
        menus: [
            {
                name: 'menu.doctor.doctor-schedule', link: '/system/doctor/manage-doctor'
            }
        ]
    }

];
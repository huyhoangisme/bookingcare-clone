export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.manage-user', menus: [
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
                link: '/system/doctor-manage'
            },
            {
                name: 'menu.admin.admin-manage',
                link: '/system/admin-manage'
            }
        ],
    },
    {
        // quản lí phòng khám
        name: 'menu.admin.clinic', menus: [
            { name: 'menu.admin.clinic-manage', link: '/system/clinic-manage' }
        ]

    }
    , {
        // quản lí chuyên khoa
        name: 'menu.admin.specialty', menus: [
            { name: 'menu.admin.specialty-manage', link: '/system/specialty-manage' }
        ]
    }, {
        // quản lí cẩm nang
        name: 'menu.admin.hanbook', menus: [
            { name: 'menu.admin.hanbook-manage', link: '/system/hanbook-manage' }
        ]
    }
];
import { createRouter, createWebHistory } from "vue-router";

const routes = [


  {
    path: '/',
    name: "Index",
    component: () => import('../components/User/Index.vue'),
    children: [
      {
        path: '/', 
        name: "HomePage",
        component: () => import('../views/User/Home.vue'),
      },
      {
        path: '/procedure', 
        name: "Procedure",
        component: () => import('../views/User/Procedure.vue'),
      },
      {
        path: '/lawTexts', 
        name: "LawTexts",
        component: () => import('../views/User/LawTexts.vue'),
      },
      {
        path: '/booking', 
        name: "Booking",
        component: () => import('../views/User/Booking.vue'),
      },

    ],

  },
  {
    path: '/login', 
    name: "user.login",
    component: () => import('../views/User/Login.vue'),
  },
  {
    path: '/register', 
    name: "user.register",
    component: () => import('../views/User/Register.vue'),
  },



  {
    path: "/admin/login",
    name: "admin.login",
    component: () => import("../views/Admin/Login.vue"),
  },

  {
    path: "/admin",
    name: "home",
    component: () => import("../components/Admin/Index.vue"),
    meta: {
      authenticatedAdmin: true
    },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("../views/Admin/Dashboard.vue"),
      },
      {
        path: "customers",
        name: "customers",
        component: () => import("../views/Admin/Customers/List.vue"),
      },
      {
        path: "staffs",
        name: "staffs",
        component: () => import("../views/Admin/Staffs/Main.vue"),
        children: [
          {
            path: "listStaffs",
            name: "ListStaffs",
            component: () => import("../views/Admin/Staffs/ListStaffs.vue"),
          },
          {
            path: "listRoles",
            name: "ListRoles",
            component: () => import("../views/Admin/Staffs/ListRoles.vue"),
          },
        ],
      },
      {
        path: "categories",
        name: "categories",
        component: () => import("../views/Admin/Categories/List.vue"),
      },
      {
        path: "costs",
        name: "costs",
        component: () => import("../views/Admin/Costs/List.vue"),
      },
      {
        path: "forms",
        name: "forms",
        component: () => import("../views/Admin/Forms/List.vue"),
      },
      {
        path: "notarizedDocuments",
        name: "notarizedDocuments",
        component: () => import("../views/Admin/notarizedDocuments/Main.vue"),
        children: [
          {
            path: "listAll",
            name: "listAll",
            component: () => import("../views/Admin/notarizedDocuments/ListAll.vue"),
          },
          {
            path: "list",
            name: "list",
            component: () => import("../views/Admin/notarizedDocuments/List.vue"),
          },
          {
            path: "listMoved",
            name: "listMoved",
            component: () => import("../views/Admin/notarizedDocuments/ListMoved.vue"),
          },
          {
            path: "form",
            name: "formNotarizedDocuments",
            component: () => import("../views/Admin/notarizedDocuments/Form.vue"),
          },
          {
            path: "invoice",
            name: "Invoice",
            component: () => import("../views/Admin/notarizedDocuments/Invoice.vue"),
          },
          {
            path: "listInvoices",
            name: "listInvoices",
            component: () => import("../views/Admin/notarizedDocuments/ListInvoices.vue"),
          },

        ],
      },
      {
        path: "lawTexts",
        name: "lawTexts",
        component: () => import("../views/Admin/lawTexts/List.vue"),
      },
      {
        path: "storages",
        name: "storages",
        component: () => import("../views/Admin/Storages/List.vue"),
      },
      {
      path: "appointments",
      name: "appointments",
      component: () => import("../views/Admin/Appointments/Main.vue"),
      children: [
        {
          path: "listAppointments",
          name: "listAppointments",
          component: () => import("../views/Admin/Appointments/List.vue"),
        },
        {
          path: "myAppointment",
          name: "myAppointment",
          component: () => import("../views/Admin/Appointments/MyAppointment.vue"),
        },
      ],
      },
      {
        path: "setting",
        name: "setting",
        component: () => import("../views/Admin/Setting.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const adminAuthenticated = localStorage.getItem('tokenAdmin') ? true : false;

  if (to.meta.authenticatedAdmin && !adminAuthenticated) {
    next({ name: "admin.login" });
  } else{
    next();
  }
});

export default router;
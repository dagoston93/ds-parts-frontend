import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "x-auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY3MzEwNjI2YzY4NzdjMzA1ZTJmZjczNCIsIm5hbWUiOiJBZ29zdG9uIiwicmlnaHRzIjp7ImNhbk1vZGlmeVBhcnRzIjp0cnVlLCJjYW5EZWxldGVQYXJ0cyI6dHJ1ZSwiY2FuTW9kaWZ5VXNlcnMiOnRydWUsImNhbkRlbGV0ZVVzZXJzIjp0cnVlfX0sInRva2VuSWQiOiJaTzNiNWxJYmJtIiwiaWF0IjoxNzMyMDQzNjAwfQ.TabecNq8ecU0TpyPavhF-bwZKxURbQD08A5Is5cmKrc",
    },
});

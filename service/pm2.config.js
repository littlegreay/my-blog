module.exports = {
    "apps": [
        {
            "name": "koa-app",
            "script": "./index.js",
            "cwd": "./",
            "args": "",
            "interpreter": "",
            "interpreter_args": "",
            //"watch": true,
            "ignore_watch": [
                "node_modules",
                "logs"
            ],
            "exec_mode": "cluster_mode",
            "instances": 2,
            "max_memory_restart": 8,
            "node_args": '--harmony',
            "error_file": "./logs/app-err.log",
            "out_file": "./logs/app-out.log",
            "merge_logs": true,
            "log_date_format": "YYYY-MM-DD HH:mm:ss",
            // "min_uptime": "60s",
            // "max_restarts": 30,
            // "autorestart": true,
            // "cron_restart": "",
            // "restart_delay": 60
        }
    ]
}
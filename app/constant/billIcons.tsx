import {
    Zap,
    Droplet,
    Wifi,
    Smartphone,
    GlassWater,
    Flame,
    CircleCheck,
    CircleAlert,
    CircleX,
} from "lucide-react";

import type {
    ExpensesNames,
    StatusType,
    IconType,
} from "@/app/type/model";

export const UtilityBillIcons: Record<ExpensesNames, IconType> = {
    Electricity: {
        icon: <Zap size={16} color="black" fill="yellow" />,
    },
    Water: {
        icon: <Droplet size={16} color="black" fill="blue" />,
    },
    Internet: {
        icon: <Wifi size={16} color="black" fill="white" />,
    },
    MobileLoad: {
        icon: <Smartphone size={16} color="black" fill="gray" />,
    },
    MineralWater: {
        icon: <GlassWater size={16} color="black" fill="blue" />,
    },
    CookingGas: {
        icon: <Flame size={16} color="black" fill="red" />,
    },
};

export const StatusColor: Record<StatusType, string> = {
    Paid: "#6B8E6B",
    Pending: "#C49A5A",
    Overdue: "#A65D57",
    Unpaid: "#8B6F47",
};

export const StatusIcons: Record<StatusType, IconType> = {
    Paid: {
        icon: <CircleCheck size={16} color="black" fill="#6B8E6B" />,
    },
    Pending: {
        icon: <CircleAlert size={16} color="black" fill="#C49A5A" />,
    },
    Overdue: {
        icon: <CircleX size={16} color="black" fill="#A65D57" />,
    },
    Unpaid: {
        icon: <CircleAlert size={16} color="black" fill="#8B6F47" />,
    },
};
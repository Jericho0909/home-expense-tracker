import {
    Zap,
    Droplet,
    Wifi,
    Smartphone,
    GlassWater,
    Flame,
    ShoppingCart,
    Beef,
    Fish,
    LeafyGreen,
    Apple,
    Cookie,
    CupSoda,
    BrushCleaning,
    CookingPot,
    Bubbles,
    House,
    Bath,
    CircleCheck,
    CircleAlert,
    CircleX,
} from "lucide-react";

import type {
    UtilitiesNames,
    FoodAndHouseHoldCategory,
    StatusType,
    IconType,
} from "@/app/type/model";

export const UtilityBillIcons: Record<UtilitiesNames, IconType> = {
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
    }
};

export const FoodAndHousholdBillIcons: Record<FoodAndHouseHoldCategory, IconType> = {
    Groceries: {
        icon: <ShoppingCart size={16} color="black" fill="gray" />,
    },
    Meat: {
        icon: <Beef size={16} color="black" fill="#A65D57" />,
    },
    Seafood: {
        icon: <Fish size={16} color="black" fill="white" />,
    },
    Fruits: {
        icon: <Apple size={16} color="black" fill="red" />,
    },
    Vegetables: {
        icon: <LeafyGreen size={16} color="black" fill="green" />,
    },
    Snacks: {
        icon: <Cookie size={16} color="black" fill="#A67C52" />,
    },
    Beverages: {
        icon: <CupSoda size={16} color="black" fill="#5F8C8C" />,
    },
    Cleaning: {
        icon: <BrushCleaning size={16} color="black" fill="#6B8E6B" />,
    },
    Laundry: {
        icon: <Bubbles size={16} color="black" fill="blue" />,
    },
    PersonalCare: {
        icon: <Bath size={16} color="black" fill="#B98282" />,
    },
    Kitchen: {
        icon: <CookingPot size={16} color="black" fill="#B86F52" />,
    },
    HomeSupplies: {
        icon: <House size={16} color="black" fill="brown" />,
    },
}

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
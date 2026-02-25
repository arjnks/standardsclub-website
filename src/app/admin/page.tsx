"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const [data, setData] = useState<{ teamMembers: any[]; events: any[] } | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null);
    const [editScale, setEditScale] = useState(1);
    const [editPosX, setEditPosX] = useState(50);
    const [editPosY, setEditPosY] = useState(50);
    const router = useRouter();

    useEffect(() => {
        const savedToken = localStorage.getItem("adminToken");
        if (savedToken) {
            setToken(savedToken);
            setIsLoggedIn(true);
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        const res = await fetch("/api/data");
        const fetchedData = await res.json();
        if (!fetchedData.error) {
            setData(fetchedData);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        if (res.ok) {
            const loginData = await res.json();
            localStorage.setItem("adminToken", loginData.token);
            setToken(loginData.token);
            setIsLoggedIn(true);
            fetchData();
        } else {
            alert("Invalid credentials");
        }
    };

    const handleSave = async () => {
        const res = await fetch("/api/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });
        if (res.ok) {
            alert("Data saved successfully!");
        } else {
            alert("Failed to save data");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        setIsLoggedIn(false);
        setToken("");
        setData(null);
        setUsername("");
        setPassword("");
    };

    const addMember = () => {
        if (!data) return;
        setData({
            ...data,
            teamMembers: [
                ...data.teamMembers,
                { name: "", role: "", id: "", linkedin: "", image: "", imagePosition: "", imageScale: "" }
            ]
        });
    };

    const removeMember = (index: number) => {
        if (!data) return;
        const newData = { ...data };
        newData.teamMembers.splice(index, 1);
        setData(newData);
    };

    const addEvent = () => {
        if (!data) return;
        setData({
            ...data,
            events: [
                ...data.events,
                { title: "", date: "", description: "", tag: "" }
            ]
        });
    };

    const removeEvent = (index: number) => {
        if (!data) return;
        const newData = { ...data };
        newData.events.splice(index, 1);
        setData(newData);
    };

    const openImageEditor = (index: number) => {
        if (!data) return;
        const member = data.teamMembers[index];
        setEditingImageIndex(index);
        setEditScale(parseFloat(member.imageScale) || 1);

        let x = 50;
        let y = 0;

        if (member.imagePosition && /\d/.test(member.imagePosition)) {
            const parts = member.imagePosition.split(" ");
            if (parts.length >= 2) {
                if (parts[0].includes("%")) x = parseFloat(parts[0]);
                else if (parts[0] === "center") x = 50;
                else if (parts[0] === "left") x = 0;
                else if (parts[0] === "right") x = 100;
                else x = parseFloat(parts[0]);

                if (parts[1].includes("%")) y = parseFloat(parts[1]);
                else if (parts[1] === "center") y = 50;
                else if (parts[1] === "top") y = 0;
                else if (parts[1] === "bottom") y = 100;
                else y = parseFloat(parts[1]);
            } else if (parts.length === 1) {
                if (parts[0].includes("%")) { x = parseFloat(parts[0]); y = parseFloat(parts[0]); }
                else if (parts[0] === "center") { x = 50; y = 50; }
                else x = parseFloat(parts[0]);
            }
        } else {
            if (member.name === "Uzma") { x = 50; y = 15; }
            else if (member.name === "Nayana K") { x = 50; y = 15; }
            else if (member.name === "Ashwin Sharma") { x = 50; y = 25; }
            else if (member.name === "Jagrat Shivhare") { x = 50; y = 15; }
            else if (member.name === "Arjun S") { x = 30; y = 0; }
            else { x = 50; y = 0; }
        }

        setEditPosX(isNaN(x) ? 50 : x);
        setEditPosY(isNaN(y) ? 0 : y);
    };

    const saveImageEdit = () => {
        if (editingImageIndex === null || !data) return;
        const newData = { ...data };
        newData.teamMembers[editingImageIndex].imageScale = editScale.toString();
        newData.teamMembers[editingImageIndex].imagePosition = `${editPosX.toFixed(0)}% ${editPosY.toFixed(0)}%`;
        setData(newData);
        setEditingImageIndex(null);
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono relative">
                <button onClick={() => router.push("/")} className="absolute top-8 left-8 text-neutral-500 hover:text-white transition-colors">
                    ← Return to Site
                </button>
                <form onSubmit={handleLogin} className="flex flex-col gap-4 bg-neutral-900 border border-white/10 p-8 rounded-lg w-[400px]">
                    <h2 className="text-xl text-bis-gold font-bold mb-4 text-center">ADMIN PORTAL</h2>
                    <p className="text-xs text-neutral-500 mb-4 text-center">Authentication Required</p>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="p-3 bg-black border border-white/20 text-white rounded outline-none focus:border-bis-gold transition-colors"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 bg-black border border-white/20 text-white rounded outline-none focus:border-bis-gold transition-colors"
                    />
                    <button type="submit" className="bg-bis-gold text-black font-bold p-3 rounded hover:bg-yellow-400 mt-4 transition-colors">
                        LOGIN
                    </button>
                </form>
            </div>
        );
    }

    if (!data) return <div className="min-h-screen bg-black text-white p-8 font-mono">Loading data...</div>;

    return (
        <div className="min-h-screen bg-black text-white p-8 font-mono">
            <div className="max-w-6xl mx-auto pb-24">
                <div className="flex justify-between items-center mb-12 bg-neutral-900/50 p-6 rounded-lg border border-white/10 sticky top-4 z-50 backdrop-blur-md">
                    <h1 className="text-xl md:text-3xl font-bold text-bis-gold">DATA CONTROL PANEL</h1>
                    <div className="flex items-center gap-2 md:gap-4">
                        <button onClick={() => router.push("/")} className="text-sm text-tech-cyan hover:underline hidden md:block">
                            Live Site
                        </button>
                        <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-400 transition-colors font-bold px-2">
                            Logout
                        </button>
                        <button onClick={handleSave} className="bg-bis-gold text-black font-bold px-4 py-2 rounded hover:bg-yellow-400 transition-colors shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                            SAVE
                        </button>
                    </div>
                </div>

                {/* Members Editor */}
                <div className="mb-16">
                    <div className="flex justify-between items-center border-b border-white/20 pb-4 mb-6">
                        <h2 className="text-xl font-bold">TEAM MEMBERS [{data.teamMembers.length}]</h2>
                        <button onClick={addMember} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded text-sm transition-colors flex items-center gap-2">
                            + ADD MEMBER
                        </button>
                    </div>

                    <div className="space-y-4">
                        {data.teamMembers.map((member, index) => (
                            <div key={index} className="flex gap-4 p-5 border border-white/10 rounded-lg bg-neutral-900/30 relative group">
                                <button
                                    onClick={() => removeMember(index)}
                                    className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
                                    title="Delete Member"
                                >
                                    ✕
                                </button>
                                <div className="flex flex-col gap-4 w-full">
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                        <input
                                            type="text"
                                            value={member.name}
                                            onChange={(e) => {
                                                const newData = { ...data };
                                                newData.teamMembers[index].name = e.target.value;
                                                setData(newData);
                                            }}
                                            className="bg-black p-3 border border-white/20 rounded focus:border-bis-gold w-full transition-colors"
                                            placeholder="Full Name"
                                        />
                                        <input
                                            type="text"
                                            value={member.role}
                                            onChange={(e) => {
                                                const newData = { ...data };
                                                newData.teamMembers[index].role = e.target.value;
                                                setData(newData);
                                            }}
                                            className="bg-black p-3 border border-white/20 rounded focus:border-bis-gold w-full transition-colors"
                                            placeholder="Role / Title"
                                        />
                                        <input
                                            type="text"
                                            value={member.id}
                                            onChange={(e) => {
                                                const newData = { ...data };
                                                newData.teamMembers[index].id = e.target.value;
                                                setData(newData);
                                            }}
                                            className="bg-black p-3 border border-white/20 rounded focus:border-bis-gold w-full transition-colors"
                                            placeholder="ID (e.g., 01)"
                                        />
                                        <input
                                            type="text"
                                            value={member.image}
                                            onChange={(e) => {
                                                const newData = { ...data };
                                                newData.teamMembers[index].image = e.target.value;
                                                setData(newData);
                                            }}
                                            className="bg-black p-3 border border-white/20 rounded focus:border-bis-gold w-full transition-colors"
                                            placeholder="Image URL"
                                        />
                                        <input
                                            type="text"
                                            value={member.linkedin}
                                            onChange={(e) => {
                                                const newData = { ...data };
                                                newData.teamMembers[index].linkedin = e.target.value;
                                                setData(newData);
                                            }}
                                            className="bg-black p-3 border border-white/20 rounded focus:border-bis-gold w-full transition-colors"
                                            placeholder="LinkedIn URL"
                                        />
                                    </div>
                                    <div className="flex justify-between items-center bg-black/30 p-4 rounded border border-white/5 mt-2">
                                        <div className="text-sm text-neutral-400">
                                            Current Scale: {member.imageScale || "1"}<br />
                                            Current Pos: {member.imagePosition || "center"}
                                        </div>
                                        <button
                                            onClick={() => openImageEditor(index)}
                                            className="bg-neutral-800 hover:bg-neutral-700 text-bis-gold border border-white/10 px-4 py-2 rounded text-sm transition-colors flex items-center gap-2 font-bold"
                                        >
                                            🖼️ EDIT IMAGE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {data.teamMembers.length === 0 && (
                            <div className="text-center py-8 text-neutral-500 border border-dashed border-white/10 rounded-lg bg-neutral-900/10">
                                No team members currently. Click "Add Member" to create one.
                            </div>
                        )}
                    </div>
                </div>

                {/* Events Editor */}
                <div>
                    <div className="flex justify-between items-center border-b border-white/20 pb-4 mb-6">
                        <h2 className="text-xl font-bold">MISSION LOGS (EVENTS) [{data.events.length}]</h2>
                        <button onClick={addEvent} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded text-sm transition-colors flex items-center gap-2">
                            + ADD EVENT
                        </button>
                    </div>

                    <div className="space-y-6">
                        {data.events.map((event, index) => (
                            <div key={index} className="flex flex-col gap-4 p-5 border border-white/10 rounded-lg bg-neutral-900/30 relative group">
                                <button
                                    onClick={() => removeEvent(index)}
                                    className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
                                    title="Delete Event"
                                >
                                    ✕
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <input
                                        type="text"
                                        value={event.title}
                                        onChange={(e) => {
                                            const newData = { ...data };
                                            newData.events[index].title = e.target.value;
                                            setData(newData);
                                        }}
                                        className="bg-black p-3 border border-white/20 rounded focus:border-bis-gold w-full transition-colors"
                                        placeholder="Event Title"
                                    />
                                    <input
                                        type="text"
                                        value={event.tag}
                                        onChange={(e) => {
                                            const newData = { ...data };
                                            newData.events[index].tag = e.target.value.toUpperCase();
                                            setData(newData);
                                        }}
                                        className="bg-black p-3 border border-white/20 rounded focus:border-bis-gold w-full transition-colors font-mono"
                                        placeholder="TAG (e.g., COMPETITION)"
                                    />
                                    <input
                                        type="text"
                                        value={event.date}
                                        onChange={(e) => {
                                            const newData = { ...data };
                                            newData.events[index].date = e.target.value.toUpperCase();
                                            setData(newData);
                                        }}
                                        className="bg-black p-3 border border-white/20 rounded focus:border-bis-gold w-full transition-colors font-mono"
                                        placeholder="DATE (e.g., OCTOBER 2024)"
                                    />
                                </div>
                                <textarea
                                    value={event.description}
                                    onChange={(e) => {
                                        const newData = { ...data };
                                        newData.events[index].description = e.target.value;
                                        setData(newData);
                                    }}
                                    className="bg-black p-3 border border-white/20 rounded focus:border-bis-gold w-full h-24 transition-colors resize-y"
                                    placeholder="Brief event description..."
                                />
                            </div>
                        ))}
                        {data.events.length === 0 && (
                            <div className="text-center py-8 text-neutral-500 border border-dashed border-white/10 rounded-lg bg-neutral-900/10">
                                No events currently. Click "Add Event" to create one.
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal Editor */}
                {editingImageIndex !== null && data && (
                    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
                        <div className="bg-neutral-900 border border-white/20 p-6 rounded-lg w-full max-w-2xl flex flex-col md:flex-row gap-8 shadow-2xl">
                            <div className="flex-1 flex flex-col items-center">
                                <h3 className="text-xl text-bis-gold font-bold mb-4 w-full text-center">FORMAT IMAGE</h3>
                                {/* Same AR as Grid Card */}
                                <div className="relative w-64 h-72 border border-white/20 bg-neutral-800 overflow-hidden flex flex-col justify-end shadow-xl">
                                    {data.teamMembers[editingImageIndex].image ? (
                                        <div
                                            className="absolute inset-0 w-full h-full pointer-events-none"
                                            style={{ transform: `scale(${editScale})` }}
                                        >
                                            <img
                                                src={data.teamMembers[editingImageIndex].image}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                                style={{ objectPosition: `${editPosX}% ${editPosY}%` }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-neutral-500 font-mono text-xs">NO IMAGE</div>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col justify-center gap-6">
                                <div>
                                    <label className="text-sm text-neutral-400 font-mono flex justify-between mb-2">
                                        <span>ZOOM / SCALE</span>
                                        <span className="text-bis-gold">{editScale.toFixed(2)}x</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0.5" max="3" step="0.05"
                                        value={editScale}
                                        onChange={(e) => setEditScale(parseFloat(e.target.value))}
                                        className="w-full accent-bis-gold"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-neutral-400 font-mono flex justify-between mb-2">
                                        <span>HORIZONTAL (X AXIS)</span>
                                        <span className="text-bis-gold">{editPosX.toFixed(0)}%</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0" max="100" step="1"
                                        value={editPosX}
                                        onChange={(e) => setEditPosX(parseFloat(e.target.value))}
                                        className="w-full accent-bis-gold"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-neutral-400 font-mono flex justify-between mb-2">
                                        <span>VERTICAL (Y AXIS)</span>
                                        <span className="text-bis-gold">{editPosY.toFixed(0)}%</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0" max="100" step="1"
                                        value={100 - editPosY}
                                        onChange={(e) => setEditPosY(100 - parseFloat(e.target.value))}
                                        className="w-full accent-bis-gold"
                                    />
                                </div>

                                <div className="flex gap-4 mt-8">
                                    <button
                                        onClick={() => setEditingImageIndex(null)}
                                        className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 rounded transition-colors text-sm"
                                    >
                                        CANCEL
                                    </button>
                                    <button
                                        onClick={saveImageEdit}
                                        className="flex-1 bg-bis-gold hover:bg-yellow-400 text-black font-bold py-3 rounded transition-colors text-sm"
                                    >
                                        APPLY CHANGES
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

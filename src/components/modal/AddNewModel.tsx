import { X, UploadCloud } from "lucide-react";
import { useState, type FormEvent, type ChangeEvent } from "react";
import type { AddModel } from "../../types";
import Button from "../Button";

interface AddNewModelModalProps {
    isOpen: boolean
    onClose: () => void
    onAddModel: (newModel: AddModel) => void
}

export default function AddNewModelModal({ isOpen, onClose, onAddModel }: AddNewModelModalProps) {
    const [name, setName] = useState("")
    const [initiator, setInitiator] = useState("")
    const [modelObjective, setModelObjective] = useState("")
    const [modelType, setModelType] = useState("")
    const [dataSource, setDataSource] = useState("")
    const [modelRemarks, setModelRemarks] = useState("")
    const [modelFile, setModelFile] = useState<File | null>(null)

    if (!isOpen) {
        return null
    }

    const resetForm = () => {
        setName("");
        setInitiator("");
        setModelObjective("");
        setModelType("");
        setDataSource("");
        setModelRemarks("");
        setModelFile(null);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;

        if (file) {
            const allowedExtensions = ["py", "r"];
            const fileExtension = file.name.split(".").pop()?.toLowerCase();

            if (fileExtension && allowedExtensions.includes(fileExtension)) {
                setModelFile(file);
            } else {
                alert("Please upload only .py or .r files.");
                setModelFile(null);
                e.target.value = "";
            }
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!name || !initiator || !modelObjective || !modelType || !dataSource || !modelRemarks || !modelFile) {
            alert("Please fill in all fields and upload the model file.");
            return;
        }
        onAddModel({
            name,
            initiator,
            model_objective: modelObjective,
            model_type: modelType,
            data_source: dataSource,
            model_remarks: modelRemarks,
            model_file: modelFile,
            description: ""
        });
        resetForm();
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 no-spinner"
            onClick={onClose}
        >
            {/* Modal Content */}
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center border-b p-4">
                    <h3 className="text-lg font-semibold">Add New Model</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 max-h-[65vh] overflow-y-auto no-scrollbar">
                    <div className="space-y-4">
                        {/* Model Name */}
                        <div>
                            <label htmlFor="modelName" className="block text-sm font-medium text-gray-700 mb-1">Model Name</label>
                            <input type="text" id="modelName" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-2" required />
                        </div>

                        {/* Initiator */}
                        <div>
                            <label htmlFor="initiator" className="block text-sm font-medium text-gray-700 mb-1">Initiator</label>
                            <input type="text" id="initiator" value={initiator} onChange={(e) => setInitiator(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-2" required />
                        </div>

                        {/* Model Objective */}
                        <div>
                            <label htmlFor="modelObjective" className="block text-sm font-medium text-gray-700 mb-1">Model Objective</label>
                            <textarea id="modelObjective" rows={3} value={modelObjective} onChange={(e) => setModelObjective(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-2" required />
                        </div>

                        {/* Model Type */}
                        <div>
                            <label htmlFor="modelType" className="block text-sm font-medium text-gray-700 mb-1">Model Type</label>
                            <select id="modelType" value={modelType} onChange={(e) => setModelType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-2" required>
                                <option value="" disabled>Select a model type</option>
                                <option value="Regression">Regression</option>
                                <option value="Classification">Classification</option>
                                <option value="Time Series">Time Series</option>
                                <option value="Clustering">Clustering</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Data Source */}
                        <div>
                            <label htmlFor="dataSource" className="block text-sm font-medium text-gray-700 mb-1">Data Source</label>
                            <input type="text" id="dataSource" value={dataSource} onChange={(e) => setDataSource(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-2" required />
                        </div>

                        {/* Model Remarks */}
                        <div>
                            <label htmlFor="modelRemarks" className="block text-sm font-medium text-gray-700 mb-1">Model Remarks</label>
                            <textarea id="modelRemarks" rows={3} value={modelRemarks} onChange={(e) => setModelRemarks(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-2" required />
                        </div>

                        {/* Model File Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Model File</label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <UploadCloud className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-2 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-2 focus-within:ring-offset-2 hover:text-primary-2/80">
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                onChange={handleFileChange}
                                                required
                                                accept=".py,.r"
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">.py or .r files</p>
                                    {modelFile && <p className="text-sm font-semibold text-green-600 mt-2">File selected: {modelFile.name}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-6 flex justify-end space-x-3 border-t pt-4">
                        <Button type="button" onClick={onClose} variant="secondary">Cancel</Button>
                        <Button type="submit">Add Model</Button>
                    </div>
                </form>
            </div >
        </div >
    );
}
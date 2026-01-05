import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../services/api';
import { Upload, CheckCircle, FileSpreadsheet } from 'lucide-react';

const DataUpload = () => {
  const navigate = useNavigate();
  const [dataType, setDataType] = useState('academics');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file');
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      // In a real implementation, you would parse the file and send the data
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          // Simulate parsing CSV/Excel data
          const text = event.target?.result as string;
          const records = text.split('\n').slice(1).filter((line) => line.trim());

          await adminAPI.uploadData({
            type: dataType,
            records: records.map((line) => {
              const values = line.split(',');
              return {
                // Map CSV columns to data structure
                // This is a simplified example
                data: values,
              };
            }),
          });

          setSuccess(true);
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } catch (error) {
          console.error('Failed to process file:', error);
          alert('Failed to upload data. Please check the file format.');
        } finally {
          setLoading(false);
        }
      };
      reader.readAsText(file);
    } catch (error) {
      console.error('Failed to upload data:', error);
      alert('Failed to upload data. Please try again.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="card text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Uploaded Successfully!</h2>
        <p className="text-gray-600">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Upload Data</h1>
        <p className="text-gray-600 mt-1">Upload general purpose data and records</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data Type *</label>
            <select
              required
              className="input-field"
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
            >
              <option value="academics">Academic Records</option>
              <option value="sports">Sports Achievements</option>
              <option value="clubs">Club Activities</option>
              <option value="cultural">Cultural Activities</option>
              <option value="research">Research Works</option>
              <option value="institutional">Institutional Service</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload File *</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-400 transition-colors">
              <div className="space-y-1 text-center">
                <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileChange}
                      required
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">CSV, XLSX up to 10MB</p>
                {file && (
                  <p className="text-sm text-primary-600 mt-2">Selected: {file.name}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>File Format:</strong> Please ensure your file follows the required format for
              the selected data type. CSV files should have headers in the first row.
            </p>
          </div>

          <div className="flex space-x-4">
            <button type="submit" disabled={loading} className="btn-primary flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              {loading ? 'Uploading...' : 'Upload Data'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataUpload;


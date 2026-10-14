'use client';

import { useTranslations } from 'next-intl';
import { useState, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import ChatWidget from '@/components/ChatWidget';

function TrackingContent() {
  const t = useTranslations('tracking');
  const [applicationId, setApplicationId] = useState('');
  const [searched, setSearched] = useState(false);
  const [status, setStatus] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    setStatus('processing');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    const statusMap: { [key: string]: string } = {
      pending: t('status.pending'),
      processing: t('status.processing'),
      approved: t('status.approved'),
      rejected: t('status.rejected'),
      additionalInfo: t('status.additionalInfo')
    };
    return statusMap[status] || status;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('subtitle')}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <form onSubmit={handleTrack} className="mb-8">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={applicationId}
                    onChange={(e) => setApplicationId(e.target.value)}
                    placeholder={t('enterId')}
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    {t('track')}
                  </button>
                </div>
              </form>

              {searched && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Application Details
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Application ID:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{applicationId || 'APP-2024-001'}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Service Type:</span>
                            <p className="font-medium text-gray-900 dark:text-white">Identity Document</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Submitted Date:</span>
                            <p className="font-medium text-gray-900 dark:text-white">October 10, 2024</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Status:</span>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                              {getStatusLabel(status)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Application Timeline
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <p className="font-medium text-gray-900 dark:text-white">Application Submitted</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">October 10, 2024</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          </div>
                          <div className="ml-4">
                            <p className="font-medium text-gray-900 dark:text-white">Under Review</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">In progress</p>
                          </div>
                        </div>

                        <div className="flex items-start opacity-50">
                          <div className="flex-shrink-0 w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <div className="ml-4">
                            <p className="font-medium text-gray-900 dark:text-white">Decision Made</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <ChatWidget />
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <TrackingContent />
    </Suspense>
  );
}

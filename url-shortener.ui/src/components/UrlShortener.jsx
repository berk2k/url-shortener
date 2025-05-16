import React, { useState } from 'react';

const UrlShortener = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setShortUrl('');

        if(!originalUrl){
            setError('Please enter url again');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/shorten', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ original_url: originalUrl }),
            });

            if(!response.ok){
                const data = await response.json();
                setError(data.error || 'an error occured');
                return;
            }

            const data = await response.json();
            setShortUrl(data.short_url);
        } catch (err){
            setError('an error occured connecting to server')
        }
    };

    return (
        <div style={{maxWidth: 600, margin: 'auto', padding:20}}>
            <h2>URL Shortener</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="url"
                    placeholder="Enter URL"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    style={{width: '100%',padding:8, marginBottom:10}}
                    required
                />
                <button type="submit" style={{ padding: '8px 16px' }}>Shorten</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {shortUrl && (
                <div style={{marginTop: 20}}>
                    <p>Shortened URL:</p>
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
                </div>
            )}

        </div>
    );

};
export default UrlShortener;
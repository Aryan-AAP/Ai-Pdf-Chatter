'use client'
import useUpload, { StatusText } from '@/hooks/useUpload';
import { CheckCircleIcon, CircleArrowDown, HammerIcon, RocketIcon, SaveIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react'
import {useDropzone} from 'react-dropzone'

function FileUploader() {
  const {progress,status,fileId,handleUpload}=useUpload();
  const router=useRouter();
  useEffect(() => {
    if (fileId) {
      router.push(`/dashboard/files/${fileId}`);
    }
  }, [fileId, router]);


    const onDrop = useCallback(async(acceptedFiles:File[])=> {


const file=acceptedFiles[0];
if(file){
  // await handle upload fn 
await handleUpload(file);
}
else{

}
        // Do something with the files

        console.log(acceptedFiles);
        
      }, [])
      const {getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({onDrop
        ,
        accept: { 'application/pdf': ['.pdf'] },
        maxFiles:1
      })
      
  const statusIcons: {
    [key in StatusText]: JSX.Element;
    
  } = {
    [StatusText.UPLOADING]: (
      <RocketIcon className="h-20 w-20 text-indigo-600" />
    ),
    [StatusText.UPLOADED]: (
      <CheckCircleIcon className="h-20 w-20 text-indigo-600" />
    ),
    [StatusText.SAVING]: <SaveIcon className="h-20 w-20 text-indigo-600" />,

    [StatusText.GENERATING]: (
      <HammerIcon className="h-20 w-20 text-indigo-600 animate-bounce" />
    ),
  };

      const uploadInProgress = progress != null && progress >= 0 && progress <= 100;


  return   (
    <div className='flex flex-col gap-4 items-center justify-center  max-w-7xl mx-auto '>

    {/* loading  */}
    {uploadInProgress && (
        <div className="mt-32 flex flex-col justify-center items-center gap-5">
          <div
            className={`radial-progress bg-indigo-300 text-white border-indigo-600 border-4 ${
              progress === 100 && "hidden"
            }`}
            role="progressbar"
            style={{
              // @ts-ignore
              "--value": progress,
              "--size": "12rem",
              "--thickness": "1.3rem",
            }}
          >
            {progress} %
          </div>

          {/* Render Status Icon */}
          {
            // @ts-ignore
            statusIcons[status!]
          }

          {/* @ts-ignore */}
          <p className="text-indigo-600 animate-pulse">{status}</p>
        </div>
      )}





{!uploadInProgress && (
        <div
          {...getRootProps()}
          className={`p-10 border-2 border-dashed mt-10 w-[90%]  border-indigo-600 text-indigo-600 rounded-lg h-96 flex items-center justify-center ${
            isFocused || isDragActive ? "bg-indigo-300" : "bg-indigo-100"
          }`}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center justify-center">
            {isDragActive ? (
              <>
                <RocketIcon className="h-20 w-20 animate-ping" />
                <p>Drop the files here ...</p>
              </>
            ) : (
              <>
                <CircleArrowDown className="h-20 w-20 animate-bounce" />
                <p>Drag n drop some files here, or click to select files</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default FileUploader
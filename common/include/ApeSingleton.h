/*MIT License

Copyright (c) 2016 MTA SZTAKI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/


#ifndef APE_SINGLETON_H
#define APE_SINGLETON_H

#include <assert.h>

namespace Ape
{
	template <typename T> class Singleton
	{
	private:
		Singleton(const Singleton<T> &);

		Singleton& operator=(const Singleton<T> &);

	protected:

		static T* msSingleton;

	public:
		Singleton( void )
		{
			assert( !msSingleton );
#if defined( _MSC_VER ) && _MSC_VER < 1200	 
			int offset = (int)(T*)1 - (int)(Singleton <T>*)(T*)1;
			msSingleton = (T*)((int)this + offset);
#else
			msSingleton = static_cast< T* >( this );
#endif
		}
		~Singleton( void )
		{  assert( msSingleton );  msSingleton = 0;  }
		static T& getSingleton( void )
		{	assert( msSingleton );  return ( *msSingleton ); }
		static T* getSingletonPtr( void )
		{ return msSingleton; }

	};
}

#endif